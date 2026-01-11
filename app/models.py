from pydantic import BaseModel
from typing import Optional

class UserModel(BaseModel):
    name: str
    email: str
    gender: str
    age: int

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None

class UserResponse(BaseModel):
    id: int
    name: str
    name: str
    email: str
    gender: str
    age: int
    
    class Config:
        from_attributes = True 