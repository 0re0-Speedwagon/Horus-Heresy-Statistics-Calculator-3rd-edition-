import os, random
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import (
    FastAPI,
    HTTPException,
    Request,
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
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
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
    abulky: int = 1

# Defending unit
class DefendInput(BaseModel):
    dmodels: int = 0
    skill: Optional[int] = 1
    T: int = 0
    W: int = 0
    sav: int = 0
    inv: Optional[int] = 7
    fnp: Optional[int] = 7
    ewarrior: Optional[int] = 0
    vehicle: bool = False
    dbulky: Optional[int] = 1
    shroud: Optional[int] = 7

# Keywords
class Keywords(BaseModel):
    snap: Optional[bool] = False
    armourbane: Optional[bool] = False
    deflagrate: Optional[bool] = False
    twinLinked: Optional[bool] = False
    hatred: Optional[bool] = False
    breaching: Optional[int] = 7
    crithits: Optional[int] = 7
    rend: Optional[int] = 7
    shred: Optional[int] = 7
    rblow: Optional[int] = 0
    phase: Optional[int] = 0

# Calculation holder
class Calculations(BaseModel):
    hcount: Optional[int] = 0
    ccount: Optional[int] = 0
    wcount: Optional[int] = 0
    bwcount: Optional[int] = 0
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
            "bwcount": self.bwcount,
            "scount": self.scount,
            "cscount": self.cscount,
            "fnpcount": self.fnpcount,
            "damage": self.damage,
            "ukilled": self.ukilled,
        }
            


class CalcRequest(BaseModel):
    offInput: AttackInput
    defInput: DefendInput
    kwords: Keywords


# Balistic skill converter
def bws(attacker: AttackInput, defender: DefendInput, keywords: Keywords):
    if keywords.phase == 0:
        #Shooting hits
        if not keywords.snap:
            if attacker.skill < 6:
                attacker.crit = keywords.crithits
                return 7 - attacker.skill
            if attacker.skill < 10:
                attacker.crit = 12 - attacker.skill
                return 2
            return 1

        # Snap shots
        bs = attacker.skill
        if bs <= 3:
            return 6
        if bs <= 5:
            return 5
        if bs <= 8:
            return 4
        if bs == 9:
            return 3
        return 2
    
    #Melee Hits
    #if a vehicle
    if defender.vehicle:
        return 2
    #regular melee
    if attacker.skill >= defender.skill * 2: 
        return 2 
    if attacker.skill > defender.skill: 
        return 3 
    if attacker.skill == defender.skill: 
        return 4 
    if attacker.skill * 2 <= defender.skill: 
        return 6 
    return 5

# Wound Calculator
def wounding(attacker: AttackInput, defender: DefendInput, keywords: Keywords):
    # For Infantry
    if not defender.vehicle:
        diff = attacker.S - defender.T
        thresholds = [
            (-4, 7),
            (-2, 6),
            (-1, 5),
            (0, 4),
            (1, 3),
        ]
        for limit, result in thresholds:
            if diff <= limit:
                if keywords.hatred:             #hatred check
                    result -= 1
                return result
        return 2

    # For Vehicles
    else:
        topen = max(defender.T - attacker.S + 1, 2)   #to penetrate (minimum 2)
        if keywords.armourbane:
            topen -= 1
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
    keywords = request.kwords       #keywords
    calc = []                       #array of calculations

    for i in range(60):
        calc.append(Calculations())
        modelattacks = ainput.attacks
        if ainput.amodels * ainput.abulky < dinput.dmodels * dinput.dbulky:
            modelattacks = ainput.attacks + keywords.rblow
        tattacks = ainput.amodels * modelattacks               #total attacks

        # Hitting
        target = bws(ainput, dinput, keywords)
        for _ in range(tattacks):
            roll = random.randint(1, 6)

            # First attempt
            if roll < target and keywords.twinLinked:
                roll = random.randint(1, 6)   # reroll once
        
            # After reroll (or no reroll), evaluate result
            if roll >= target:
                if roll >= ainput.crit:
                    calc[i].ccount += 1
                else:
                    calc[i].hcount += 1
                
        # Wounding
        target = wounding(ainput, dinput, keywords)
        for _ in range(calc[i].hcount):
            num = random.randint(1, 6)              #roll a d6
            if num >= target:
                if num >= keywords.breaching:          #breach check
                    calc[i].bwcount += 1    
                else:
                    calc[i].wcount += 1             #if no breach cont.

        # Regular Save
        target = saving(ainput, dinput)
        for _ in range(calc[i].wcount):                            #how many regular rolls in save were unsuccessful
            num = random.randint(1, 6)
            if num >= target:
                calc[i].scount += 1

        # Critical Save
        for _ in range(calc[i].ccount):                                       #how many crit rolls in save were unsuccessful
            num = random.randint(1, 6)
            if num >= target:
                calc[i].cscount += 1

        calc[i].damage = ((calc[i].wcount - calc[i].scount) * max(ainput.D - dinput.ewarrior, 1)) + ((calc[i].ccount - calc[i].cscount) * max(ainput.D - dinput.ewarrior, 1))

        # Feel No Pain
        if dinput.fnp < 7:                          #if a fnp actually exists
            for _ in range(calc[i].damage):         #how many regular rolls in fnp were unsuccessful
                num = random.randint(1, 6)
                if num < dinput.fnp:
                    calc[i].fnpcount += 1

        # Damage Allocation
        model = dinput.W                                                                           #initial model set
        for _ in range((calc[i].wcount - calc[i].scount) + (calc[i].ccount - calc[i].cscount)):    #unsaved wounds loop
            model -= max(ainput.D - dinput.ewarrior, 1)                                            #apply damage to model
            if model <= 0:                                                                         #reset model and increment if dead
                model = dinput.W
                calc[i].ukilled += 1



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

