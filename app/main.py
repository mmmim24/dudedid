# cd app
# source ./venv/bin/activate
# uvicorn main:app --reload
from fastapi import FastAPI,Query, status
from fastapi.responses import JSONResponse

app = FastAPI()

users = ['John', 'Doe', 'Alice', 'Bob', 'Chris']

@app.get("/")
async def root():
    return {"message": "Hello from slowAPI"}

@app.get("/users/{id}", status_code=status.HTTP_200_OK)
async def getUser(id: str):
    if id.isdigit():
        idn = int(id)
        if idn in range(0,len(users)):
            return users[idn]
        else:
            return JSONResponse(
                status_code = status.HTTP_404_NOT_FOUND,
                content = {"error": f"user with id = {id} does not exist"}
            )
    else:
        return JSONResponse(
            status_code = status.HTTP_400_BAD_REQUEST,
            content = {"error": f"{id} is not a valid id"}
        )


# python3 ./main.py
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

# deactivate