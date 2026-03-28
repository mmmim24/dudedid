import sys, os
from fastapi.testclient import TestClient
from app.main import fastapi
from app.utils.auth_dependency import get_current_user
from app.database import Base,connect_db
from app.config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine=create_engine(settings.dev_db)
TestSessionLocal=sessionmaker(bind=engine)

_created_user = None

def get_or_create_user():
    global _created_user
    if not _created_user:
        temp_client = TestClient(fastapi)
        response = temp_client.post("/api/v1/users/", json={
            "name": "Test User",
            "email": "testuser@example.com",
            "password": "testpassword",
            "gender": "Male",
            "age": 25
        })
        _created_user = response.json()
    return _created_user

def mock_current_user():
    user = get_or_create_user()
    return {"sub": str(user["id"])}

def override_connect_db():
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

fastapi.dependency_overrides[get_current_user] = mock_current_user
fastapi.dependency_overrides[connect_db] = override_connect_db

client = TestClient(fastapi)
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))