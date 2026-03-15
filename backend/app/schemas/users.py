from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from app.models.users import GenderEnum

class UserCreate(BaseModel):
    name: Optional[str]=None
    email: EmailStr
    password: str
    gender: Optional[GenderEnum]=None
    age: Optional[int]=None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    gender: Optional[GenderEnum] = None
    age: Optional[int] = None

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values = True)
    id: int
    name: Optional[str]
    email: EmailStr
    gender: Optional[GenderEnum]
    age: Optional[int]

class Login(BaseModel):
    email: EmailStr
    password: str
    
    # class Config:
    #     from_attributes = True
    #     use_enum_values = True