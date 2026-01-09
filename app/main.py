# cd app
# source ./venv/bin/activate
# uvicorn main:app --reload
from fastapi import FastAPI, Query, status, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import User, SessionLocal
from models import UserModel,UserResponse,UserUpdate
from typing import List

    
app = FastAPI()

def connect_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Hello from slowAPI"}

@app.post("/users", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def createUser(user: UserModel, db: Session = Depends(connect_db)):
    
    if user.email:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )
    
    new_user = User(
        name=user.name,
        email=user.email,
        gender=user.gender,
        age=user.age
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@app.get("/search", status_code=status.HTTP_200_OK)
async def search_users(
    name: str = Query(None),
    age: int = Query(None),
    db: Session = Depends(connect_db)
):
    query = db.query(User)
    
    if name:
        query = query.filter(User.name.contains(name))
    if age:
        query = query.filter(User.age == age)
    
    users = query.all()
    return users

@app.get("/users", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def getAllUsers(db: Session = Depends(connect_db)):
    users = db.query(User).all()
    return users

@app.get("/users/{id}", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def getUser(id: str, db: Session = Depends(connect_db)):
    user = db.query(User).filter(User.id == id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id = {id} does not exist"
        )
    
    return user


@app.patch("/users/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def updateUser(id: str, user: UserUpdate, db: Session = Depends(connect_db)):
    db_user = db.query(User).filter(User.id == id).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id = {id} does not exist"
        )
    
    update_data = user.model_dump(exclude_unset=True)
    
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )
    
    if "email" in update_data and update_data["email"] != db_user.email:
        existing_user = db.query(User).filter(User.email == update_data["email"]).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )    
    
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    
    return db_user
        
@app.put("/users/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def replaceUser(id: str, user: UserModel, db: Session = Depends(connect_db)):
    db_user = db.query(User).filter(User.id == id).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id = {id} does not exist"
        )
        
    if user.email and user.email != db_user.email:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )
    
    db_user.name = user.name
    db_user.email = user.email
    db_user.gender = user.gender
    db_user.age = user.age
    
    db.commit()
    db.refresh(db_user)
    
    return db_user
        
@app.delete("/users/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def deleteUser(id: str, db: Session = Depends(connect_db)):
    db_user = db.query(User).filter(User.id == id).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id = {id} does not exist"
        )
    
    deleted_user = {
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email,
        "gender": db_user.gender,
        "age": db_user.age
    }
    
    db.delete(db_user)
    db.commit()
    
    return None
        

# python3 ./main.py
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

# deactivate