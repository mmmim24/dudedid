# Uvicorn Server Setup - Troubleshooting Report

**Date:** February 7, 2026  
**Issue:** `uvicorn main:app --reload` command returning exit code 127 (command not found)  
**Status:** ✅ RESOLVED

---

## Problem Summary

The FastAPI backend server failed to start when attempting to run uvicorn. The command produced exit code 127, which indicates the command was not found in the system PATH.

### Root Causes Identified

1. **Missing Python Dependencies**
   - uvicorn was not installed
   - FastAPI was not installed
   - Other required packages (sqlalchemy, alembic, python-multipart) were missing

2. **No Virtual Environment**
   - Python packages were not installed in a project-specific virtual environment
   - System-wide package installation was restricted by PEP 668 policy

3. **Incorrect Import Paths**
   - `app/routers/users.py` used incorrect module paths for imports
   - `app/main.py` used relative imports instead of absolute imports
   - Module naming conflict between `models.py` file and `models/` directory

---

## Step-by-Step Solution

### Step 1: Verify Python Installation and Check Available Packages

```bash
cd /home/mmmim/workspace/dudedid/backend
python3 -m pip list
```

**Result:** Confirmed that uvicorn, fastapi, and other required packages were NOT installed.

---

### Step 2: Create Python Virtual Environment

```bash
cd /home/mmmim/workspace/dudedid/backend
python3 -m venv venv
```

**Why:** 
- Isolates project dependencies from system Python
- Avoids PEP 668 "externally-managed-environment" restrictions
- Follows Python best practices for project management

**Output:** Virtual environment created successfully in `./venv/`

---

### Step 3: Install Required Dependencies

```bash
./venv/bin/pip install fastapi uvicorn sqlalchemy alembic python-multipart
```

**Dependencies Installed:**
- **fastapi** (0.128.4) - Web framework for building APIs
- **uvicorn** (0.40.0) - ASGI server to run FastAPI apps
- **sqlalchemy** (2.0.46) - Database ORM
- **alembic** (1.18.3) - Database migration tool
- **python-multipart** (0.0.22) - For handling file uploads and form data

**Plus transitive dependencies:**
- starlette, pydantic, click, h11, and others

---

### Step 4: Identify and Fix Import Path Errors

#### Issue 4a: Incorrect imports in `app/routers/users.py`

**Before:**
```python
from app.main.database import User, SessionLocal
from app.main.models import UserModel,UserResponse,UserUpdate
```

**After:**
```python
from app.database import User, SessionLocal
from app.models import UserModel,UserResponse,UserUpdate
```

**Why:** 
- Database and models modules are in `app/` directory, not `app/main/`
- Corrected module path structure matches actual file locations

---

#### Issue 4b: Incorrect imports in `app/main.py`

**Before:**
```python
from routers import users
```

**After:**
```python
from app.routers import users
```

**Why:**
- Proper absolute imports from the top-level `app` package
- Allows uvicorn to correctly import when run from `backend/` directory
- Relative imports fail when running from different working directories

---

### Step 5: Resolve Module Naming Conflict

**Problem:** 
- File `app/models.py` conflicted with directory `app/models/`
- When importing `from app.models`, Python tried to use the directory instead of the file
- The directory's `__init__.py` was empty, causing `ImportError`

**Solution:**
Moved model definitions into `app/models/__init__.py`:

**File:** `app/models/__init__.py`
```python
from pydantic import BaseModel
from typing import Optional

class UserModel(BaseModel):
    name: str
    email: str
    gender: str
    age: int

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    gender: str
    age: int
    
    class Config:
        from_attributes = True
```

**Note:** Fixed duplicate field `name` in `UserResponse` class (was listed twice)

---

### Step 6: Start the Uvicorn Server

```bash
cd /home/mmmim/workspace/dudedid/backend
./venv/bin/uvicorn app.main:app --reload
```

**Output:**
```
INFO:     127.0.0.1:34978 - "GET /users HTTP/1.1" 307 Temporary Redirect
INFO:     127.0.0.1:34978 - "GET /users/ HTTP/1.1" 200 OK
INFO:     127.0.0.1:34978 - "GET /favicon.ico HTTP/1.1" 404 Not Found
```

**Result:** ✅ Server started successfully! Server is running on `http://127.0.0.1:8000`

---

## Files Modified

| File | Changes |
|------|---------|
| `app/main.py` | Updated import: `from app.routers import users` |
| `app/routers/users.py` | Updated imports: `from app.database` and `from app.models` |
| `app/models/__init__.py` | Added model definitions, removed duplicate `name` field |

## Files Created

| File | Purpose |
|------|---------|
| `venv/` (directory) | Python virtual environment with all dependencies |

---

## Verification

Server status can be verified by:

```bash
# Check if server is running
curl http://127.0.0.1:8000/

# Access the users endpoint
curl http://127.0.0.1:8000/users/

# View API documentation
# Visit: http://127.0.0.1:8000/docs (Swagger UI)
# Visit: http://127.0.0.1:8000/redoc (ReDoc)
```

---

## Future Recommendations

1. **Add `.gitignore`** to exclude virtual environment:
   ```
   venv/
   __pycache__/
   *.pyc
   .env
   ```

2. **Update requirements.txt** to lock dependency versions:
   ```bash
   ./venv/bin/pip freeze > requirements.txt
   ```

3. **Document startup instructions** in project README

4. **Consider using environment variables** for database configuration

---

## Summary

| Issue | Cause | Solution |
|-------|-------|----------|
| Exit code 127 | uvicorn not installed | Created venv and installed dependencies |
| ModuleNotFoundError: routers | Relative import from wrong location | Changed to absolute import `from app.routers` |
| ModuleNotFoundError: app.main.database | Incorrect module path | Updated to `from app.database` |
| ImportError: cannot import UserModel | Empty models directory __init__.py | Moved model definitions to `app/models/__init__.py` |

**Final Status:** ✅ All issues resolved - FastAPI server running successfully
