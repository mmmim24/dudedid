import sys, os
from fastapi.testclient import TestClient
from app.main import fastapi

client = TestClient(fastapi)
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))