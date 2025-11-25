"""
Simple FastAPI Starter - Calculator API
==================================

"""

# Step 1: Import what we need
import os
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker

# Looks for .env file in current directory and parent directories
load_dotenv()

# Get DATABASE_URL from environment variable, fallback to local development
# Format: postgresql+asyncpg://username:password@host:port/database_name
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the database engine - this manages the connection pool
# Think of it as a "factory" that creates database connections
engine = create_async_engine(DATABASE_URL, echo=False)

# Create a session factory - this creates individual database sessions
# Each request will get its own session to query the database
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# This is called a "dependency" - FastAPI will automatically call this
# for each request and pass the result to your endpoint functions
async def get_db():
    """
    Generator function that yields a database session.

    The 'yield' keyword is special - it:
    1. Creates a session when the function is called
    2. Gives it to your endpoint function
    3. Closes the session when the endpoint finishes

    This ensures database connections are properly cleaned up.
    """
    async with AsyncSessionLocal() as session:
        yield session  # Give the session to the endpoint
        # After the endpoint finishes, the session is automatically closed


# Pydantic Schemas go here

# This is the main application object - it handles all incoming requests
app = FastAPI(title="TODO API", description="A simple CRUD API for managing Calculator")

# This automatically creates all tables defined in your SQLAlchemy models
@app.on_event("startup")
async def create_tables():
    """
    Create all database tables on application startup.
    This uses SQLAlchemy to generate tables from your model definitions.
    Works for both Docker and Railway databases.

    Note: Docker Compose's depends_on: service_healthy ensures the database
    is ready before this code runs.
    """
    async with engine.begin() as conn:
        # Use run_sync to run the synchronous create_all method
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database tables created successfully")

# CORS (Cross-Origin Resource Sharing) is needed because your React app
# runs on a different port (5173) than your API (8000)
# Without this, browsers would block requests from your frontend
# Note: In production with combined deployment, CORS may not be needed
# but we keep it for development flexibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (in production, specify exact URLs)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# This must come AFTER all API routes so API routes are matched first
# Check if static directory exists (production build)
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

# This code only runs if you execute the file directly (not if imported)
if __name__ == "__main__":
    import uvicorn

    # uvicorn is the web server that runs FastAPI
    # --reload means it will restart when you change the code
    uvicorn.run(app, host="0.0.0.0", port=8000)


# Note: The server will be run in Docker (see Docker Configuration section)
# If you have Poetry installed locally, you can also run:
# poetry run uvicorn server:app --reload
