# cd backend
# source ./venv/bin/activate
# uvicorn app.main:fastapi --reload
from fastapi import FastAPI, status
from app.database import create_tables
from app.routers import users,tasks,auth
from app.config import settings

from contextlib import asynccontextmanager


@asynccontextmanager
async def startup(app:FastAPI):
    create_tables()
    yield
    
fastapi = FastAPI(title=settings.app_name,lifespan=startup)

fastapi.include_router(users.router,prefix=settings.api_prefix)
fastapi.include_router(tasks.router,prefix=settings.api_prefix)
fastapi.include_router(auth.router, prefix=settings.api_prefix)

@fastapi.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Welcome to dudedid task management backend"}

# python3 ./main.py
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:fastapi", host="0.0.0.0", port=8080, reload=True)

# deactivate