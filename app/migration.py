import json
from database import SessionLocal, User

db = SessionLocal()

with open('./users.json', 'r') as file:
    data = json.load(file)

for user_data in data:
    user = User(
        name=user_data['name'],
        email=user_data['email'],
        gender=user_data['gender'],
        age=user_data['age']
    )
    db.add(user)

db.commit()
db.close()
print("Migration complete!")