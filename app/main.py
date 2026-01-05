# cd app
# source ./venv/bin/activate
# uvicorn main:app --reload
from fastapi import FastAPI,Query, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import json
file_path = './users.json'

with open(file_path, 'r') as file:
    data = json.load(file)
    
app = FastAPI()
class UserModel(BaseModel):
    name: str
    # email: Optional[str] = None
    # gender: Optional[str] = None
    # age: Optional[int] = None

@app.get("/")
async def root():
    return {"message": "Hello from slowAPI"}

@app.get("/users")
async def getAllUsers():
    return data

@app.get("/users/{id}", status_code=status.HTTP_200_OK)
async def getUser(id: str):
    if id.isdigit():
        idn = int(id)
        for i in range(0,len(data)):
            if data[i]["id"]==idn:
                return data[i]
        return JSONResponse(
            status_code = status.HTTP_404_NOT_FOUND,
            content = {"error": f"user with id = {id} does not exist"}
        )
    else:
        return JSONResponse(
            status_code = status.HTTP_400_BAD_REQUEST,
            content = {"error": f"{id} is not a valid id"}
        )

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    age: Optional[int] = None

@app.patch("/users/{id}", status_code=status.HTTP_200_OK)
async def updateUser(id: str, user_update: UserUpdate):
    if id.isdigit():
        idn = int(id)
        
        for i in range(len(data)):
            if data[i]["id"] == idn:
                if user_update.name is not None:
                    data[i]["name"] = user_update.name
                if user_update.email is not None:
                    data[i]["email"] = user_update.email
                if user_update.age is not None:
                    data[i]["age"] = user_update.age
                
                with open(file_path, 'w') as file:
                    json.dump(data, file, indent=2)
                
                return {
                    "message": "User updated successfully",
                    "user": data[i]
                }
        
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": f"user with id = {id} does not exist"}
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": f"{id} is not a valid id"}
        )
        
@app.delete("/users/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def deleteUser(id: str):
    if id.isdigit():
        idn = int(id)
        
        for i in range(len(data)):
            if data[i]["id"] == idn:
                data.pop(i)
                
                with open(file_path, 'w') as file:
                    json.dump(data, file, indent=2)
                
                return None
        
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": f"user with id = {id} does not exist"}
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": f"{id} is not a valid id"}
        )
        
@app.post("/users", status_code=status.HTTP_201_CREATED)
async def createUser(user: UserModel):
    
    new_id = data[-1]["id"] + 1 if data else 0
    new_user = {
        "id": new_id,
        "name": user.name
        # "email": user.email,
        # "gender": user.gender,
        # "age": user.age
    }
    
    data.append(new_user)
    
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)
    
    return {
        "message": "User created successfully",
        "user": new_user
        }

@app.get("/search",status_code=status.HTTP_200_OK)
async def search_items(q: str ,limit: int,skip: int,):
    return {
        "query": q,
        "limit": limit,
        "skip": skip,
    }

# python3 ./main.py
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

# deactivate