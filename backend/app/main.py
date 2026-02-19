# cd app
# source ./venv/bin/activate
# uvicorn app.main:fastapi --reload
from fastapi import FastAPI, status
from app.routers import users

fastapi = FastAPI()

fastapi.include_router(users.router)

@fastapi.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Hello from slowAPI"}

# python3 ./main.py
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:fastapi", host="0.0.0.0", port=8080, reload=True)

# deactivate