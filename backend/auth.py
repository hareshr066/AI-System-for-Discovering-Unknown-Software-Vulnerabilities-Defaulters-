from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import bcrypt

router = APIRouter()

MONGO_URI = "mongodb+srv://manivelavan420534_db_user:mani2006@cluster0.vjvarcp.mongodb.net/vulnerability_scanner?retryWrites=true&w=majority&connectTimeoutMS=30000&socketTimeoutMS=30000"

client = MongoClient(MONGO_URI)
db = client["vulnerability_scanner"]
users_collection = db["users"]

class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup")
async def signup(user: UserSignup):
    try:
        if users_collection.find_one({"email": user.email}):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        if users_collection.find_one({"username": user.username}):
            raise HTTPException(status_code=400, detail="Username already taken")
        
        password_bytes = user.password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
        
        users_collection.insert_one({
            "username": user.username,
            "email": user.email,
            "password": hashed_password
        })
        
        return {"message": "User registered successfully", "username": user.username}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.post("/login")
async def login(user: UserLogin):
    try:
        db_user = users_collection.find_one({"email": user.email})
        
        if not db_user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        password_bytes = user.password.encode('utf-8')
        if not bcrypt.checkpw(password_bytes, db_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        return {"message": "Login successful", "username": db_user["username"], "email": db_user["email"]}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
