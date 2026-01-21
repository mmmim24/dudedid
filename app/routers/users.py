from fastapi import APIRouter, Query, status, Depends, HTTPException
from sqlalchemy.orm import Session

from database import User, SessionLocal
from models import UserModel,UserResponse,UserUpdate
from typing import List

router = APIRouter(
    prefix='/users',
    tags=['users']
)

def connect_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
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


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def getAllUsers(db: Session = Depends(connect_db)):
    users = db.query(User).all()
    return users

@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def getUser(id: int, db: Session = Depends(connect_db)):
    user = db.query(User).filter(User.id == id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id = {id} does not exist"
        )
    
    return user


@router.patch("/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def updateUser(id: int, user: UserUpdate, db: Session = Depends(connect_db)):
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
        
@router.put("/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def replaceUser(id: int, user: UserModel, db: Session = Depends(connect_db)):
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
        
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def deleteUser(id: int, db: Session = Depends(connect_db)):
    db_user = db.query(User).filter(User.id == id).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id = {id} does not exist"
        )
    
    db.delete(db_user)
    db.commit()
    
    return None

@router.get("/search", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
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
