from conftest import client
from app.schemas.users import UserResponse,UserCreate,UserUpdate
from typing import List
from pydantic import TypeAdapter

def test_create_user_success():
    data = client.get("/api/v1/users")
    all_users = data.json()
    email_exist = False
    
    payload: UserCreate = {
        "name": "Hasan",
        "email": "hasan@example.com",
        "gender": "Male",
        "age": 25
    }
            
    for user in all_users:
        if user["email"]=="hasan@example.com":
            email_exist = True
    
    if(email_exist):
        response = client.post("/api/v1/users/", json=payload)
        assert response.status_code == 409
    else:        
        response = client.post("/api/v1/users/", json=payload)    
        assert response.status_code == 201
        data = response.json()
        adapter = TypeAdapter(UserResponse)
        user = adapter.validate_python(data)
        assert user.name == payload["name"]
        assert user.email == payload["email"]
    

def test_create_user_duplicate_email():
    payload: UserCreate = {
        "name": "Hasan",
        "email": "hasan@example.com",  
        "gender": "Male",
        "age": 25
    }
    response = client.post("/api/v1/users/", json=payload)
    assert response.status_code == 409
    assert response.json()["detail"] == "Email already registered"

def test_create_user_missing_fields():
    payload = {
        "name": "Hasan",
    }
    response = client.post("/api/v1/users/", json=payload)
    assert response.status_code == 422

def test_get_all_users():
    response = client.get("/api/v1/users/")
    
    assert response.status_code==200
    
    data = response.json()
    
    adapter = TypeAdapter(List[UserResponse])
    users = adapter.validate_python(data)
    
    assert isinstance(users, list)
    
def test_get_user_by_id_success():
    
    data = client.get("/api/v1/users")
    all_users = data.json()
    
    if len(all_users) == 0:
        
        payload : UserCreate = {
            "name": "Rahim",
            "email": "rahim@example.com",
            "gender": "Male",
            "age": 30
        }
        created = client.post("/api/v1/users/", json=payload).json()
        user_id = created["id"]
    else:
        user_id = all_users[0]["id"]

    response = client.get(f"/api/v1/users/{user_id}")
    assert response.status_code == 200
    data = response.json()
    adapter = TypeAdapter(UserResponse)
    user = adapter.validate_python(data)
    assert user.id == user_id

def test_get_user_by_id_not_found():
    response = client.get("/api/v1/users/99999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()
    
def test_get_user_by_id_invalid_id():
    response = client.get("/api/v1/users/asdkhb")
    assert response.status_code == 422

def test_patch_user_success():
    
    data = client.get("/api/v1/users")
    all_users = data.json()
    
    if len(all_users) == 0:
        
        payload: UserCreate = {
            "name": "Karim",
            "email": "karim@example.com",
            "gender": "Male",
            "age": 22
        }
        created = client.post("/api/v1/users/", json=payload).json()
        user_id = created["id"]
    else:
        user_id = all_users[0]["id"]

    update_payload : UserUpdate = {
        "name": f"{all_users[0]["name"]} Updated",
        "age": all_users[0]["age"] + 1
    }
    
    response = client.patch(f"/api/v1/users/{user_id}", json=update_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == f"{all_users[0]["name"]} Updated"
    assert data["age"] == all_users[0]["age"] + 1

def test_patch_user_empty_body():
    
    data = client.get("/api/v1/users")
    all_users = data.json()
    
    if len(all_users) == 0:
        payload : UserCreate = {
            "name": "Nabil",
            "email": "nabil@example.com",
            "gender": "Male",
            "age": 28
        }
        created = client.post("/api/v1/users/", json=payload).json()
        user_id = created["id"]
    else:
        user_id = all_users[0]["id"]

    response = client.patch(f"/api/v1/users/{user_id}", json={})
    assert response.status_code == 400
    assert response.json()["detail"] == "No fields to update"

def test_patch_user_duplicate_email():
    
    data = client.get("/api/v1/users")
    all_users = data.json()
    
    if len(all_users) < 2:
        user1 = client.post("/api/v1/users/", json={
            "name": "User One", "email": "userone@example.com", "gender": "Male", "age": 20
        }).json()
        user2 = client.post("/api/v1/users/", json={
            "name": "User Two", "email": "usertwo@example.com", "gender": "Female", "age": 21
        }).json()
        
    else:
        user1,user2 = all_users[0],all_users[1]
        
    response = client.patch(f"/api/v1/users/{user2['id']}", json={"email": f"{user1["email"]}"})
    assert response.status_code == 409
    assert response.json()["detail"] == "Email already registered"

def test_patch_user_not_found():
    response = client.patch("/api/v1/users/99999", json={"name": "Ghost"})
    assert response.status_code == 404

def test_delete_user_success():
    
    data = client.get("/api/v1/users")
    all_users = data.json()
    
    if len(all_users) == 0:
        payload : UserCreate = {
            "name": "ToDelete",
            "email": "todelete@example.com",
            "gender": "Male",
            "age": 20
        }
        created = client.post("/api/v1/users/", json=payload).json()
        user_id = created["id"]
    else:
        user_id = all_users[0]["id"]

    response = client.delete(f"/api/v1/users/{user_id}")
    assert response.status_code == 204

  
    get_response = client.get(f"/api/v1/users/{user_id}")
    assert get_response.status_code == 404

def test_delete_user_not_found():
    response = client.delete("/api/v1/users/99999")
    assert response.status_code == 404