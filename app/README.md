# FastAPI Project

## Setup Instructions

1. Clone the repository:
```bash
   git clone https://github.com/mmmim24/dudedid.git
   git checkout backend
   cd app
```

2. Create and activate virtual environment:
```bash
   python3 -m venv venv
   source ./venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
   pip install -r requirements.txt
```

4. Run the server:
```bash
   uvicorn main:app --reload
```

5. Access the API:
   - API: http://127.0.0.1:8000
   - Docs: http://127.0.0.1:8000/docs