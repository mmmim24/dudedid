# cd app
# source ./venv/bin/activate
# uvicorn main:app --reload
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from slowAPI"}


# python3 ./main.py
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

# deactivate