from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List

from app.database import connect_db
from app.schemas.users import UserResponse, UserCreate, UserUpdate
from app.controllers.users import UserController

router = APIRouter(
    prefix='/users',
    tags=['users'],
    default_response_class=JSONResponse,
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def createUser(user:UserCreate, db: Session = Depends(connect_db)):
    new_user = UserController.create_user(user,db)
    return new_user

@router.get("/search", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def search_users(name: str, db: Session = Depends(connect_db)):
    users = UserController.search_user_by_name(name,db)
    return users

@router.get("/", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def get_users(db: Session = Depends(connect_db)):
    users = UserController.get_all_users(db)
    return users

@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def get_user(id: int, db: Session = Depends(connect_db)):
    user = UserController.get_user_by_id(id,db)
    return user

@router.patch("/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def updateUser(id: int, request_data: UserUpdate, db: Session = Depends(connect_db)):
    db_user = UserController.update_user_by_id(id,request_data,db)
    return db_user
        
@router.put("/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def replaceUser(id: int, request_data: UserCreate, db: Session = Depends(connect_db)):
    new_user = UserController.replace_user_by_id(id,request_data,db)
    return new_user
        
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def deleteUser(id: int, db: Session = Depends(connect_db)):
    UserController.delete_user_by_id(id, db)
    return None

# searched moved before all get request because of router ordering
