from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.database import connect_db
from app.schemas.users import UserResponse,UserCreate,Login
from app.controllers.auth import AuthController
from app.utils.security import verify_access_token

router = APIRouter(
    prefix='/auth',
    tags=['Auth'],
    default_response_class=JSONResponse
)

@router.post('/me', status_code=status.HTTP_200_OK)
async def auth_check(token: str):
    return verify_access_token(token)

@router.post('/signup', status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def sign_up(data: UserCreate, db: Session = Depends(connect_db)):
    user = AuthController.sign_up(data,db)
    return user

@router.post('/login', status_code=status.HTTP_200_OK)
async def log_in(data: Login, db: Session=Depends(connect_db)):
    response = AuthController.log_in(data, db)
    return response