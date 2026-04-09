from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from pathlib import Path
import os

# Load environment variables FIRST
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Now import everything else
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from datetime import datetime, timezone, timedelta
from bson import ObjectId
import secrets

# Import our modules
from auth import (
    hash_password, verify_password, create_access_token, create_refresh_token,
    get_current_user, check_brute_force, record_failed_login, clear_failed_logins
)
from models import (
    UserRegister, UserLogin, UserResponse, ForgotPasswordRequest, ResetPasswordRequest,
    SettingsUpdate, SettingsResponse, ServiceCreate, ServiceResponse,
    ReviewCreate, ReviewResponse, PaymentMethodsUpdate, PaymentMethodsResponse,
    SocialMediaUpdate, SocialMediaResponse
)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure CORS
frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== STARTUP EVENTS ====================

@app.on_event("startup")
async def startup_event():
    """Initialize database indexes and seed admin user"""
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.password_reset_tokens.create_index("expires_at", expireAfterSeconds=0)
    await db.login_attempts.create_index("identifier")
    logger.info("Database indexes created")
    
    # Seed admin user
    await seed_admin()
    logger.info("Admin user seeded")

async def seed_admin():
    """Seed admin user and write credentials to file"""
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@techmasters.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "TechMasters2025!")
    
    existing = await db.users.find_one({"email": admin_email})
    
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hashed,
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc)
        })
        logger.info(f"Admin user created: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info(f"Admin password updated: {admin_email}")
    
    # Write credentials to file
    os.makedirs("/app/memory", exist_ok=True)
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write("# Test Credentials for Tech Masters Solutions\n\n")
        f.write("## Admin Account\n")
        f.write(f"- **Email:** {admin_email}\n")
        f.write(f"- **Password:** {admin_password}\n")
        f.write(f"- **Role:** admin\n\n")
        f.write("## Auth Endpoints\n")
        f.write("- POST /api/auth/register\n")
        f.write("- POST /api/auth/login\n")
        f.write("- POST /api/auth/logout\n")
        f.write("- GET /api/auth/me\n")
        f.write("- POST /api/auth/refresh\n")
        f.write("- POST /api/auth/forgot-password\n")
        f.write("- POST /api/auth/reset-password\n\n")
        f.write("## Content Endpoints (Protected)\n")
        f.write("- GET/PUT /api/settings\n")
        f.write("- GET/POST/DELETE /api/services\n")
        f.write("- GET/POST/DELETE /api/reviews\n")
        f.write("- GET/PUT /api/payments\n")

# ==================== AUTH ENDPOINTS ====================

@api_router.post("/auth/register", response_model=UserResponse)
async def register(user: UserRegister, response: Response):
    """Register a new user"""
    # Normalize email
    email = user.email.lower()
    
    # Check if user exists
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    password_hash = hash_password(user.password)
    
    # Create user
    user_doc = {
        "email": email,
        "password_hash": password_hash,
        "name": user.name,
        "role": "user",
        "created_at": datetime.now(timezone.utc)
    }
    
    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    
    # Create tokens
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    # Set cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=900,
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=604800,
        path="/"
    )
    
    user_doc["_id"] = user_id
    user_doc.pop("password_hash")
    return user_doc

@api_router.post("/auth/login")
async def login(credentials: UserLogin, request: Request, response: Response):
    """Login user"""
    email = credentials.email.lower()
    identifier = f"{request.client.host}:{email}"
    
    # Check brute force
    await check_brute_force(db, identifier)
    
    # Find user
    user = await db.users.find_one({"email": email})
    if not user:
        await record_failed_login(db, identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(credentials.password, user["password_hash"]):
        await record_failed_login(db, identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Clear failed attempts
    await clear_failed_logins(db, identifier)
    
    # Create tokens
    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    # Set cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=900,
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=604800,
        path="/"
    )
    
    user["_id"] = user_id
    user.pop("password_hash")
    return user

@api_router.post("/auth/logout")
async def logout(response: Response):
    """Logout user"""
    response.delete_cookie(key="access_token", path="/")
    response.delete_cookie(key="refresh_token", path="/")
    return {"message": "Logged out successfully"}

@api_router.get("/auth/me")
async def get_me(request: Request):
    """Get current user"""
    user = await get_current_user(request, db)
    return user

@api_router.post("/auth/refresh")
async def refresh_token(request: Request, response: Response):
    """Refresh access token"""
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Refresh token not found")
    
    try:
        import jwt
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=["HS256"])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        
        user_id = payload["sub"]
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        # Create new access token
        access_token = create_access_token(user_id, user["email"])
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=900,
            path="/"
        )
        
        return {"message": "Token refreshed"}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

@api_router.post("/auth/forgot-password")
async def forgot_password(request_data: ForgotPasswordRequest):
    """Send password reset token"""
    email = request_data.email.lower()
    user = await db.users.find_one({"email": email})
    
    if not user:
        # Don't reveal if email exists
        return {"message": "If the email exists, a reset link has been sent"}
    
    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
    
    await db.password_reset_tokens.insert_one({
        "token": reset_token,
        "user_id": user["_id"],
        "expires_at": expires_at,
        "used": False
    })
    
    # In production, send email. For now, log it
    reset_link = f"https://tech-ct.preview.emergentagent.com/reset-password?token={reset_token}"
    logger.info(f"Password reset link for {email}: {reset_link}")
    
    return {"message": "If the email exists, a reset link has been sent"}

@api_router.post("/auth/reset-password")
async def reset_password(request_data: ResetPasswordRequest):
    """Reset password using token"""
    token_doc = await db.password_reset_tokens.find_one({"token": request_data.token})
    
    if not token_doc:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    if token_doc.get("used"):
        raise HTTPException(status_code=400, detail="Reset token already used")
    
    if token_doc["expires_at"] < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Reset token expired")
    
    # Update password
    new_hash = hash_password(request_data.new_password)
    await db.users.update_one(
        {"_id": token_doc["user_id"]},
        {"$set": {"password_hash": new_hash}}
    )
    
    # Mark token as used
    await db.password_reset_tokens.update_one(
        {"token": request_data.token},
        {"$set": {"used": True}}
    )
    
    return {"message": "Password reset successfully"}

# ==================== SETTINGS ENDPOINTS ====================

@api_router.get("/settings", response_model=SettingsResponse)
async def get_settings():
    """Get website settings"""
    settings = await db.settings.find_one({"_id": "main"})
    if not settings:
        # Return defaults
        return {
            "companyName": "Tech Masters Solutions",
            "tagline": "Energía y Tecnología para tu Hogar y Negocio",
            "phone": "2033170884",
            "email": "stechmasters@gmail.com",
            "location": "Connecticut"
        }
    return settings

@api_router.put("/settings", response_model=SettingsResponse)
async def update_settings(settings: SettingsUpdate, request: Request):
    """Update website settings (protected)"""
    await get_current_user(request, db)  # Check auth
    
    update_data = {k: v for k, v in settings.dict().items() if v is not None}
    
    await db.settings.update_one(
        {"_id": "main"},
        {"$set": update_data},
        upsert=True
    )
    
    updated = await db.settings.find_one({"_id": "main"})
    return updated

# ==================== SERVICES ENDPOINTS ====================

@api_router.get("/services")
async def get_services():
    """Get all services"""
    services = await db.services.find().to_list(100)
    return [{"id": str(s["_id"]), **{k: v for k, v in s.items() if k != "_id"}} for s in services]

@api_router.post("/services", response_model=ServiceResponse)
async def create_service(service: ServiceCreate, request: Request):
    """Create a new service (protected)"""
    await get_current_user(request, db)  # Check auth
    
    service_doc = service.dict()
    result = await db.services.insert_one(service_doc)
    
    return {"id": str(result.inserted_id), **service_doc}

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str, request: Request):
    """Delete a service (protected)"""
    await get_current_user(request, db)  # Check auth
    
    result = await db.services.delete_one({"_id": ObjectId(service_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    
    return {"message": "Service deleted"}

# ==================== REVIEWS ENDPOINTS ====================

@api_router.get("/reviews")
async def get_reviews():
    """Get all reviews"""
    reviews = await db.reviews.find().to_list(100)
    return [{"id": str(r["_id"]), **{k: v for k, v in r.items() if k != "_id"}} for r in reviews]

@api_router.post("/reviews", response_model=ReviewResponse)
async def create_review(review: ReviewCreate, request: Request):
    """Create a new review (protected)"""
    await get_current_user(request, db)  # Check auth
    
    review_doc = review.dict()
    result = await db.reviews.insert_one(review_doc)
    
    return {"id": str(result.inserted_id), **review_doc}

@api_router.delete("/reviews/{review_id}")
async def delete_review(review_id: str, request: Request):
    """Delete a review (protected)"""
    await get_current_user(request, db)  # Check auth
    
    result = await db.reviews.delete_one({"_id": ObjectId(review_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    
    return {"message": "Review deleted"}

# ==================== PAYMENTS ENDPOINTS ====================

@api_router.get("/payments", response_model=PaymentMethodsResponse)
async def get_payment_methods():
    """Get payment methods"""
    payments = await db.payment_methods.find_one({"_id": "main"})
    if not payments:
        return {"zelle": "", "cashapp": "", "venmo": ""}
    return payments

@api_router.put("/payments", response_model=PaymentMethodsResponse)
async def update_payment_methods(payments: PaymentMethodsUpdate, request: Request):
    """Update payment methods (protected)"""
    await get_current_user(request, db)  # Check auth
    
    update_data = {k: v for k, v in payments.dict().items() if v is not None}
    
    await db.payment_methods.update_one(
        {"_id": "main"},
        {"$set": update_data},
        upsert=True
    )
    
    updated = await db.payment_methods.find_one({"_id": "main"})
    return updated

# ==================== SOCIAL MEDIA ENDPOINTS ====================

@api_router.get("/social-media", response_model=SocialMediaResponse)
async def get_social_media():
    """Get social media links"""
    social = await db.social_media.find_one({"_id": "main"})
    if not social:
        return {"facebook": "", "instagram": "", "twitter": "", "linkedin": "", "youtube": "", "tiktok": ""}
    return social

@api_router.put("/social-media", response_model=SocialMediaResponse)
async def update_social_media(social: SocialMediaUpdate, request: Request):
    """Update social media links (protected)"""
    await get_current_user(request, db)  # Check auth
    
    update_data = {k: v for k, v in social.dict().items() if v is not None}
    
    await db.social_media.update_one(
        {"_id": "main"},
        {"$set": update_data},
        upsert=True
    )
    
    updated = await db.social_media.find_one({"_id": "main"})
    return updated

# Include the router in the main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
