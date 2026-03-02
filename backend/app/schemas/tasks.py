from pydantic import BaseModel,ConfigDict
from typing import Optional
from app.models.tasks import PriorityEnum,StatusEnum
from datetime import datetime
class TaskCreate(BaseModel):
    user_id: int
    title: str
    description: str
    priority: PriorityEnum
class TaskUpdate(BaseModel):
    title: Optional[str]=None
    description: Optional[str]=None
    priority: Optional[PriorityEnum]=None
    status: Optional[StatusEnum]=None
class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)
    id: int
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
    priority: PriorityEnum
    status: StatusEnum
    user_id: int