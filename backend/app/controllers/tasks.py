from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import datetime
from typing import List

from app.models.users import User
from app.models.tasks import Task, StatusEnum
from app.schemas.tasks import TaskCreate, TaskResponse, TaskUpdate

class TaskController:
    
    @staticmethod
    def create_task(data: TaskCreate, db: Session, current_user: dict) -> TaskResponse:
        user_id = int(current_user["sub"])
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="The user not found"
            )
        
        new_task = Task(
            title = data.title,
            description = data.description,
            created_at = datetime.today(),
            updated_at = datetime.now(),
            priority = data.priority,
            status = StatusEnum.PENDING,
            user_id = user_id
        )
        
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    
    @staticmethod
    def get_all_tasks(db: Session, current_user: dict) -> List[TaskResponse]:
        user_id = int(current_user["sub"])
        tasks = db.query(Task).filter(Task.user_id == user_id).all()
        return tasks
    
    @staticmethod
    def get_task_by_id(id: int, db: Session, current_user: dict) -> TaskResponse:
        user_id = int(current_user["sub"])
        task = db.query(Task).filter(Task.id == id).first()
        if not task:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Task with id {id} not found"
            )
        if task.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        return task
    
    @staticmethod
    def update_task_by_id(id: int, data: TaskUpdate, db: Session, current_user: dict) -> TaskResponse:
        user_id = int(current_user["sub"])
        task = db.query(Task).filter(Task.id == id).first()
        if not task:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Task with id {id} not found"
            )
        if task.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        updated_task = data.model_dump(exclude_unset=True)
        
        if not updated_task:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update"
            )
            
        
        for key, value in updated_task.items():
            setattr(task, key, value)
        task.updated_at = datetime.now()
            
        db.commit()
        db.refresh(task)
        
        return task
    
    @staticmethod
    def delete_task_by_id(id: int, db: Session, current_user: dict):
        user_id = int(current_user["sub"])
        task = db.query(Task).filter(Task.id == id).first()
        if not task:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Task with id {id} not found"
            )
        if task.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        db.delete(task)
        db.commit()
        
        