from conftest import client
from app.schemas.users import UserResponse
from typing import List
from pydantic import TypeAdapter

def test_get_all_users():
    response = client.get("/api/v1/users/")
    
    assert response.status_code==200
    
    data = response.json()
    
    adapter = TypeAdapter(List[UserResponse])
    users = adapter.validate_python(data)
    
    assert isinstance(users, list)