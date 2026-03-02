from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import datetime
from typing import List

from app.models.users import User
from app.models.tasks import Task, StatusEnum
from app.schemas.tasks import TaskCreate, TaskResponse, TaskUpdate

class TaskController:
    
    @staticmethod
    def create_task(data: TaskCreate, db: Session) -> TaskResponse:
        user = db.query(User).filter(User.id == data.user_id).first()
        
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
            user_id = data.user_id
        )
        
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    
    @staticmethod
    def get_all_tasks(user_id: int, db: Session) -> List[TaskResponse]:
        tasks = db.query(Task).filter(Task.user_id == user_id).all()
        return tasks