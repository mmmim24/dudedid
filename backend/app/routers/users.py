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
        
# @router.put("/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
# async def replaceUser(id: int, user: UserModel, db: Session = Depends(connect_db)):
#     db_user = db.query(User).filter(User.id == id).first()
    
#     if not db_user:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"User with id = {id} does not exist"
#         )
        
#     if user.email and user.email != db_user.email:
#         existing_user = db.query(User).filter(User.email == user.email).first()
#         if existing_user:
#             raise HTTPException(
#                 status_code=status.HTTP_409_CONFLICT,
#                 detail="Email already registered"
#             )
    
#     db_user.name = user.name
#     db_user.email = user.email
#     db_user.gender = user.gender
#     db_user.age = user.age
    
#     db.commit()
#     db.refresh(db_user)
    
#     return db_user
        
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def deleteUser(id: int, db: Session = Depends(connect_db)):
    UserController.delete_user_by_id(id, db)
    return None

# @router.get("/search", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
# async def search_users(
#     name: str = Query(None),
#     age: int = Query(None),
#     db: Session = Depends(connect_db)
# ):
#     query = db.query(User)
    
#     if name:
#         query = query.filter(User.name.contains(name))
#     if age:
#         query = query.filter(User.age == age)
    
#     users = query.all()
#     return users
