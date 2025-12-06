import os
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import (
    Depends,
    FastAPI,
    HTTPException,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
)
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker

#====================
#Application Object
#====================
app = FastAPI(
    title="Calculator API", description="A simple CRUD API for managing the calculator"
)

#====================
#CORS Middleware
#====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (in production, specify exact URLs)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


