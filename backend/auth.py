import os
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException, Request
from bson import ObjectId

JWT_ALGORITHM = "HS256"

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
        "type": "access"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request, db) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def check_brute_force(db, identifier: str) -> None:
    """Check if user is locked out due to too many failed login attempts"""
    attempt_record = await db.login_attempts.find_one({"identifier": identifier})
    if attempt_record:
        if attempt_record.get("attempts", 0) >= 5:
            lockout_until = attempt_record.get("lockout_until")
            if lockout_until and lockout_until > datetime.now(timezone.utc):
                raise HTTPException(status_code=429, detail="Too many failed login attempts. Try again later.")

async def record_failed_login(db, identifier: str) -> None:
    """Record a failed login attempt"""
    attempt_record = await db.login_attempts.find_one({"identifier": identifier})
    if attempt_record:
        new_attempts = attempt_record.get("attempts", 0) + 1
        lockout_until = None
        if new_attempts >= 5:
            lockout_until = datetime.now(timezone.utc) + timedelta(minutes=15)
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$set": {"attempts": new_attempts, "lockout_until": lockout_until, "last_attempt": datetime.now(timezone.utc)}}
        )
    else:
        await db.login_attempts.insert_one({
            "identifier": identifier,
            "attempts": 1,
            "last_attempt": datetime.now(timezone.utc)
        })

async def clear_failed_logins(db, identifier: str) -> None:
    """Clear failed login attempts on successful login"""
    await db.login_attempts.delete_one({"identifier": identifier})
