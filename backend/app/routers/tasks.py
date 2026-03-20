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
    default_response_class=JSONResponse,
)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=TaskResponse)
async def create_task(data: TaskCreate, db: Session = Depends(connect_db), current_user: dict = Depends(get_current_user)):
    task = TaskController.create_task(data,db,current_user)
    return task

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[TaskResponse])
async def get_tasks(db: Session = Depends(connect_db), current_user: dict = Depends(get_current_user)):
    tasks = TaskController.get_all_tasks(db,current_user)
    return tasks

@router.get('/{id}', status_code=status.HTTP_200_OK, response_model=TaskResponse)
async def get_task(id: int, db: Session = Depends(connect_db), current_user: dict = Depends(get_current_user)):
    task = TaskController.get_task_by_id(id,db,current_user)
    return task

@router.patch('/{id}', status_code=status.HTTP_200_OK, response_model=TaskResponse)
async def update_task(id: int, data: TaskUpdate, db: Session = Depends(connect_db), current_user: dict = Depends(get_current_user)):
    updated_task = TaskController.update_task_by_id(id,data,db,current_user)
    return updated_task

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(id: int, db: Session = Depends(connect_db), current_user: dict = Depends(get_current_user)):
    TaskController.delete_task_by_id(id,db,current_user)
    return None

@router.delete('/', status_code=status.HTTP_204_NO_CONTENT)
async def delete_all_tasks(db: Session = Depends(connect_db), current_user: dict = Depends(get_current_user)):
    TaskController.delete_all_tasks(db,current_user)
    return None