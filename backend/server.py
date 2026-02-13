import os, random
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import (
    FastAPI,
    HTTPException,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
)
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker

#====================
# Application Object
#====================
app = FastAPI(
    title="Calculator API", description="A simple CRUD API for managing the calculator"
)

#====================a
# CORS Middleware
#====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (in production, specify exact URLs)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    # Mount static files (CSS, JS, images, etc.)
    app.mount(
        "/assets",
        StaticFiles(directory=os.path.join(static_dir, "assets")),
        name="assets",
    )

    # Serve index.html for all non-API routes (SPA routing)
    # This catch-all route must be last so API routes take precedence
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    """
    Serve the React app for all non-API routes.
    This allows React Router to handle client-side routing.
    """
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="Frontend not found")
    

#====================
# Unit Objects
#====================

# Attacking unit
class AttackInput(BaseModel):
    amodels: int = 0
    attacks: int = 0
    skill: int = 0  # e.g., 3 for 3+
    S: int = 0
    AP: int = 0
    D: int = 0
    crit: Optional[int] = 7
    snap: bool = False

# Defending unit
class DefendInput(BaseModel):
    dmodels: int = 0
    T: int = 0
    W: int = 0
    sav: int = 0
    inv: Optional[int] = 7
    fnp: Optional[int] = 7
    vehicle: bool = False

# Calculation holder
class Calculations(BaseModel):
    hcount: Optional[int] = 0
    ccount: Optional[int] = 0
    wcount: Optional[int] = 0
    scount: Optional[int] = 0
    cscount: Optional[int] = 0
    fnpcount: Optional[int] = 0
    damage: Optional[int] = 0
    ukilled: Optional[int] = 0

    def to_dict(self):
        return{
            "hcount": self.hcount,
            "ccount": self.ccount,
            "wcount": self.wcount,
            "scount": self.scount,
            "cscount": self.cscount,
            "fnpcount": self.fnpcount,
            "damage": self.damage,
            "ukilled": self.ukilled,
        }
            


class CalcRequest(BaseModel):
    offInput: AttackInput
    defInput: DefendInput


# Balistic skill converter
def bws(attacker: AttackInput):
    if attacker.snap == False:                      #check for snap shots
        if attacker.skill < 6:                      #non crit bs
            tohit = 7 - (attacker.skill)
        elif attacker.skill < 10:                   #crit bs
            tohit = 2
            attacker.crit = 12 - attacker.skill
        else:
            tohit = 1                                       #auto hit
    else:                                                   #snap shot checks
        if attacker.skill == 2 | attacker.skill == 3:
            tohit = 6
        elif attacker.skill == 4 | attacker.skill == 5:
            tohit = 5
        elif attacker.skill >= 6 | attacker.skill <= 8:
            tohit = 4
        elif attacker.skill == 9:
            tohit = 3
        else:
            tohit = 2
    return tohit                                            #return modified variable

# Wound Calculator
def wounding(attacker: AttackInput, defender: DefendInput):
    # For Infantry
    if defender.vehicle == False:
        diff = attacker.S - defender.T
        if diff <= -4:         #impossible of 4 or less
            return 7
        elif diff <= -2:         #6+ for 2 or 3 less
            return 6
        elif diff == -1:      #5+ for 1 less
            return 5
        elif diff == 0:          #4+ for equal
            return 4
        elif diff == 1:      #3+ for 1 higher
            return 3
        else:               #2+ for 2 or more diff
            return 2
    # For Vehicles
    else:
        topen = max(defender.T - attacker.S + 1, 2)   #to penetrate (minimum 2)
        return topen

def saving(attacker: AttackInput, defender: DefendInput):
    if attacker.AP > defender.sav:                          #check ap
        save = defender.sav                                 #set save to defenders save
    else:
        save = defender.inv                                 #set to invulneralbe save (Default 7)
    return save

#====================
# Calculator Endpoint
#====================

# CREATE: Run Calculator
@app.post("/calculate")
async def calculate(request: CalcRequest):
    #Make it so that this runs 20 times then outputs to graphs

    ainput = request.offInput       #attacker input
    dinput = request.defInput       #defender input
    calc = []                       #array of calculations

    for i in range(20):
        calc.append(Calculations())
        dmodels = [dinput.W for _ in range(dinput.dmodels)]     #array of defending models and their wounds
        tattacks = ainput.amodels * ainput.attacks               #total attacks

        # Hitting
        hit = [random.randint(1, 6) for _ in range(tattacks)]      #rolls totall attacks and places them into an array

        for num in hit:                                     #how many rolls in hit were successful
            if num > bws(ainput):
                if num >= ainput.crit:
                    calc[i].ccount += 1             #if crit skip wounds
                else:
                    calc[i].hcount += 1             #if regular add to wounds

        # Wounding
        wound = [random.randint(1, 6) for _ in range(calc[i].hcount)]   #rolls total wounds and places them into an array

        for num in wound:                                       #how many rolls in wound were successful
            if num > wounding(ainput, dinput):
                calc[i].wcount += 1

        # Saves
        regsave = [random.randint(1, 6) for _ in range(calc[i].wcount)]     #rolls total saves and places them into an array
        critsave = [random.randint(1, 6) for _ in range(calc[i].ccount)]    #rolls crit saves and places them into an array

        for num in regsave:                                       #how many regular rolls in save were unsuccessful
            if num < saving(ainput, dinput):
                calc[i].scount += 1

        for num in critsave:                                       #how many crit rolls in save were unsuccessful
            if num < saving(ainput, dinput):
                calc[i].cscount += 1

        calc[i].damage = (calc[i].scount * ainput.D) + (calc[i].cscount * ainput.D + 1)
        moddamage = calc[i].damage                                          #second damage varaible for modifying
        # Feel No Pain
        if dinput.fnp < 7:         #if a fnp actually exists
            fnp = [random.randint(1, 6) for _ in range(calc[i].damage)]     #rolls feel no pains and places them into an array

            for num in fnp:                                               #how many regular rolls in fnp were unsuccessful
                if num < dinput.fnp:
                    calc[i].fnpcount += 1

        # Damage Allocation
        #REWRITE THIS!!!!!!
        j = 0
        calc[i].ukilled = 0
        if len(dmodels) > 0:
            while moddamage >= 0:
                if dmodels[i] > 0:
                    dmodels[i] -= 1
                    moddamage -= 1
                else:
                    j += 1
                    calc[i].ukilled +=1

    print([c.to_dict() for c in calc])
    return JSONResponse(content=[c.to_dict() for c in calc])


#====================
# MAIN
#====================
if __name__ == "__main__":
    import uvicorn

    # uvicorn is the web server that runs FastAPI
    # --reload means it will restart when you change the code
    uvicorn.run(app, host="0.0.0.0", port=8000)

