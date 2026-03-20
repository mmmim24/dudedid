from sqlalchemy import Column, Integer, String, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum
from app.database import Base

class GenderEnum(str, enum.Enum):
    MALE = "Male"
    FEMALE = "Female"
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    gender = Column(SQLEnum(GenderEnum), nullable=True)
    age = Column(Integer, nullable=True)
    
    tasks = relationship("Task", back_populates="owner", cascade="all, delete-orphan")
