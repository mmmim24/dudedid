from conftest import client
from app.schemas.tasks import TaskResponse, TaskCreate,TaskUpdate
from typing import List
from pydantic import TypeAdapter

def test_create_task():
    payload: TaskCreate = {
        "title": "test",
        "description": "test",
        "priority": "Low",
        "status": "pending"
    }
    response = client.post("/api/v1/tasks/",json=payload)
    assert response.status_code == 201
    data = response.json()
    adapter = TypeAdapter(TaskResponse)
    task = adapter.validate_python(data)
    assert task.title == payload["title"]
    assert task.description == payload["description"]
    assert task.priority == payload["priority"]
    assert task.status == payload["status"]
    
def test_task_create_missing_fields():
    payload = {
        "title": "missing",
        "priority": "High"
    }
    response = client.post("/api/v1/tasks/",json=payload)
    assert response.status_code == 422

def test_get_tasks():
    response = client.get("/api/v1/tasks/")
    
    assert response.status_code==200
    
    data = response.json()
    
    adapter = TypeAdapter(List[TaskResponse])
    tasks = adapter.validate_python(data)
    
    assert isinstance(tasks, list)
    
def test_get_task_by_id():
    
    response = client.get("/api/v1/tasks")
    all_tasks = response.json()
    
    if len(all_tasks) == 0:
        
        payload : TaskCreate = {
            "title": "new task",
            "description": "new description",
            "priority": "Low",
            "status": "pending"
        }
        
        created_task =  client.post("/api/v1/tasks/",json=payload).json()
        task_id = created_task["id"]
    else:
        task_id = all_tasks[0]["id"]
        
    response = client.get(f"/api/v1/tasks/{task_id}")
    assert response.status_code == 200
    
def test_task_id_not_found():
    response = client.get("/api/v1/tasks/999999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()
    
def test_task_id_invalid():
    response = client.get("/api/v1/tasks/asdf")
    assert response.status_code == 422
    
def test_update_task():
    response = client.get("/api/v1/tasks")
    all_tasks = response.json()
    
    if len(all_tasks) == 0:
        payload : TaskCreate = {
            "title": "new task",
            "description": "new description",
            "priority": "Low",
            "status": "pending"
        }
        
        created_task =  client.post("/api/v1/tasks/",json=payload).json()
        task_id = created_task["id"]
    else:
        task_id = all_tasks[0]["id"]
        
    updated_payload: TaskUpdate = {
        "priority": "High",
        "status": "started"
    }
    
    response = client.patch(f"/api/v1/tasks/{task_id}",json=updated_payload)
    
    assert response.status_code == 200
    updated_task = response.json()
    assert updated_task["priority"] == updated_payload["priority"]
    assert updated_task["status"] == updated_payload["status"]
    
def test_update_task_empty():
    response = client.get("/api/v1/tasks")
    all_tasks = response.json()
    
    if len(all_tasks) == 0:
        payload : TaskCreate = {
            "title": "new task",
            "description": "new description",
            "priority": "Low",
            "status": "pending"
        }
        
        created_task =  client.post("/api/v1/tasks/",json=payload).json()
        task_id = created_task["id"]
    else:
        task_id = all_tasks[0]["id"]
    
    response = client.patch(f"/api/v1/tasks/{task_id}",json={})
    
    assert response.status_code == 400
    assert response.json()["detail"] == "No fields to update"
    
def test_delete_task():
    response = client.get("/api/v1/tasks")
    all_tasks = response.json()
    
    if len(all_tasks) == 0:
        payload : TaskCreate = {
            "title": "new task",
            "description": "new description",
            "priority": "Low",
            "status": "pending"
        }
        
        created_task =  client.post("/api/v1/tasks/",json=payload).json()
        task_id = created_task["id"]
    else:
        task_id = all_tasks[0]["id"]
        
    response = client.delete(f"/api/v1/tasks/{task_id}")
    assert response.status_code == 204
    
    get_response = client.get(f"/api/v1/tasks/{task_id}")
    assert get_response.status_code == 404
    
def test_delete_all_tasks():
    create_response = client.post("/api/v1/tasks/", json={
        "title": "Task to delete",
        "description": "This task will be deleted",
        "priority": "Low"
    })
    assert create_response.status_code == 201

    response = client.get("/api/v1/tasks")
    all_tasks = response.json()
    assert isinstance(all_tasks, list)
    assert len(all_tasks) > 0

    delete_response = client.delete("/api/v1/tasks")
    assert delete_response.status_code == 204

    response_after = client.get("/api/v1/tasks")
    assert response_after.status_code == 200
    assert len(response_after.json()) == 0