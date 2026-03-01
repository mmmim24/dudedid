from pydantic import BaseModel, EmailStr
from typing import Optional
from app.models.users import GenderEnum

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    gender: GenderEnum
    age: int

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    gender: Optional[GenderEnum] = None
    age: Optional[int] = None

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    gender: GenderEnum
    age: int
    
    class Config:
        from_attributes = True
        use_enum_values = True