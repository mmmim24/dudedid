# cd app
# source ./venv/bin/activate
# uvicorn main:app --reload
from fastapi import FastAPI, status
from routers import users

app = FastAPI()

app.include_router(users.router)

@app.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Hello from slowAPI"}

# python3 ./main.py
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

# deactivate