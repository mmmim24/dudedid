from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List

from app.database import connect_db
from app.schemas.tasks import TaskResponse, TaskCreate, TaskUpdate
from app.controllers.tasks import TaskController
from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix='/tasks',
    tags=['tasks'],
    dependencies=[Depends(get_current_user)],
    default_response_class=JSONResponse,
)

@router.post('/', status_code=status.HTTP_200_OK, response_model=TaskResponse)
async def create_task(data: TaskCreate, db: Session = Depends(connect_db)):
    task = TaskController.create_task(data,db)
    return task

@router.get('/{user_id}', status_code=status.HTTP_200_OK, response_model=List[TaskResponse])
async def get_tasks(user_id: int, db: Session = Depends(connect_db)):
    tasks = TaskController.get_all_tasks(user_id, db)
    return tasks