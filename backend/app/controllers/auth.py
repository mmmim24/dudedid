from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.users import User
from app.schemas.users import Login, UserCreate

class AuthController:
    @staticmethod
    def sign_up(data: UserCreate,db: Session):
        if data.email:
            existing = db.query(User).filter(User.email == data.email).first()
            
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email already registered"
                )
        
        new_user = User(
            name=data.name,
            email=data.email,
            password=data.password,
            gender=data.gender,
            age=data.age
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    
    @staticmethod
    def log_in(data:Login ,db: Session):
        if data.email:
            existing = db.query(User).filter(User.email == data.email).first()
            if not existing:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Email not found"
                )
            else:
                return {"token": "btt"}