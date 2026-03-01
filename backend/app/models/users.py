from sqlalchemy import Column, Integer, String, Enum as SQLEnum
import enum
from app.database import Base

class GenderEnum(str, enum.Enum):
    MALE = "Male"
    FEMALE = "Female"
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    gender = Column(SQLEnum(GenderEnum), nullable=False)
    age = Column(Integer, nullable=False)
