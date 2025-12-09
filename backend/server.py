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
class ForceCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Handle preflight
        if request.method == "OPTIONS":
            return Response(
                status_code=200,
                headers={
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Credentials": "true",
                }
            )

        try:
            response = await call_next(request)
        except Exception as exc:
            # Even on crash, we return a response with CORS headers
            response = Response(content=f"Server error: {str(exc)}", status_code=500)

        response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        return response

app.add_middleware(ForceCORSMiddleware)
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

class Calculations(BaseModel):
    hcount: Optional[int] = 0
    ccount: Optional[int] = 0
    wcount: Optional[int] = 0
    scount: Optional[int] = 0
    cscount: Optional[int] = 0
    fnpcount: Optional[int] = 0
    damage: Optional[int]
    ukilled: Optional[int]
    modleft: Optional[int]

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
            "modleft": self.modleft
        }
            


class CalcRequest(BaseModel):
    offInput: AttackInput
    defInput: DefendInput


# Balistic skill converter
def bws(attacker: AttackInput):
    # Regular
    if attacker.snap == False:
        if attacker.skill < 6:
            return 7 - attacker.skill
        elif attacker.skill < 10:
            attacker.crit = 12 - attacker.skill
            return 2
        else:
            return 1
    # Snapshots
    else:
        # Fixed: was using | (bitwise) instead of or / in
        if attacker.skill in (2, 3):
            return 6
        elif attacker.skill in (4, 5):
            return 5
        elif attacker.skill in (6, 7, 8):
            return 4
        elif attacker.skill == 9:
            return 3
        else:
            return 2

# Wound Calculator
def wounding(attacker: AttackInput, defender: DefendInput):
    # For Infantry
    if defender.vehicle == False:
        if attacker.S < defender.T - 3:         #impossible of 4 or less
            return 7
        if attacker.S < defender.T - 1:         #6+ for 2 or 3 less
            return 6
        elif attacker.S == defender.T - 1:      #5+ for 1 less
            return 3
        elif attacker.S == defender.T:          #4+ for equal
            return 4
        elif attacker.S == defender.T + 1:      #3+ for 1 higher
            return 3
        elif attacker.S > defender.T + 1:       #2+ for 2 or more diff
            return 2
    # For Vehicles
    else:
        topen = defender.T - attacker.S + 1   #to penetrate
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
@app.get("/weenis")
async def ultramarines():
    return "Hello We are getting weenises"


# CREATE: Run Calculator
@app.post("/calculate")
async def calculate(request: CalcRequest):
    #Make it so that this runs 20 times then outputs to graphs

    ainput = request.offInput
    dinput = request.defInput
    calc = Calculations()

      #array of defending models and their wounds
    tattacks = ainput.models * ainput.attacks               #total attacks
    
    # Hitting
    hit = [random.randint(1, 6) for _ in tattacks]      #rolls totall attacks and places them into an array

    for num in hit:                                     #how many rolls in hit were successful
        if num > bws(ainput):
            if num >= ainput.crit:
                calc.ccount += 1             #if crit skip wounds
            else:
                calc.hcount += 1             #if regular add to wounds

    # Wounding
    wound = [random.randint(1, 6) for _ in range(calc.hcount)]   #rolls total wounds and places them into an array

    for num in wound:                                       #how many rolls in wound were successful
        if num > wounding(ainput, dinput):
            calc.wcount += 1

    # Saves
    regsave = [random.randint(1, 6) for _ in range(calc.wcount)]     #rolls total saves and places them into an array
    critsave = [random.randint(1, 6) for _ in range(calc.ccount)]    #rolls crit saves and places them into an array

    for num in regsave:                                       #how many regular rolls in save were unsuccessful
        if num < saving(ainput, dinput):
            calc.scount += 1

    for num in critsave:                                       #how many crit rolls in save were unsuccessful
        if num < saving(ainput, dinput):
            calc.cscount += 1
    
    calc.damage = (calc.scount * ainput.D) + (calc.cscount * ainput.D + 1)
    moddamage = calc.damage                                          #second damage varaible for modifying
    # Feel No Pain
    if dinput.fnp < 7:         #if a fnp actually exists
        fnp = [random.randint(1, 6) for _ in range(calc.damage)]     #rolls feel no pains and places them into an array

        for num in fnp:                                               #how many regular rolls in fnp were unsuccessful
            if num < dinput.fnp:
                calc.fnpcount += 1

    # Damage Allocation
    i = 0
    calc.ukilled = 0
    totalwounds = dinput.W * dinput.dmodels
    remwounds = totalwounds - calc.damage
    print(remwounds)
    if remwounds <= 0:
        calc.ukilled = dinput.models
    else:
        calc.modleft = remwounds / dinput.W
        calc.ukilled = dinput.dmodels - calc.modleft

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
# MAIN
#====================
if __name__ == "__main__":
    import uvicorn

    # uvicorn is the web server that runs FastAPI
    # --reload means it will restart when you change the code
    uvicorn.run(app, host="0.0.0.0", port=8000)

