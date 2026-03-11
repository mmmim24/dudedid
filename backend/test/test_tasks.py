from conftest import client
from app.schemas.tasks import TaskResponse
from typing import List
from pydantic import TypeAdapter

def test_get_tasks():
    response = client.get("/api/v1/tasks/2")
    
    assert response.status_code==200
    
    data = response.json()
    
    adapter = TypeAdapter(List[TaskResponse])
    tasks = adapter.validate_python(data)
    
    assert isinstance(tasks, list)