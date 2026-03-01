from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List

from app.models.users import User
from app.schemas.users import UserCreate,UserResponse,UserUpdate

class UserController:
    
    @staticmethod
    def create_user(user: UserCreate, db: Session) -> UserResponse:
        if user.email:
            existing = db.query(User).filter(User.email == user.email).first()
            if existing:
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
    
    @staticmethod
    def get_all_users(db: Session) -> List[UserResponse]:
        users = db.query(User).all()
        return users
    
    @staticmethod
    def get_user_by_id(user_id: int, db: Session) -> UserResponse:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id {user_id} not found"
            )
        return user
    
    @staticmethod
    def update_user_by_id(user_id:int, data:UserUpdate, db: Session):
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id= {user_id} not exist"
            )
            
        updated_user = data.model_dump(exclude_unset=True)
        
        if not updated_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update"
            )
            
        if "email" in updated_user and updated_user["email"] != user.email:
            existing_user = db.query(User).filter(User.email == updated_user["email"]).first()
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email already registered"
                )    
        
        for key, value in updated_user.items():
            setattr(user, key, value)
        
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def delete_user_by_id(user_id:int, db: Session):
        db_user = db.query(User).filter(User.id == user_id).first()
    
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id = {id} does not exist"
            )
        
        db.delete(db_user)
        db.commit()