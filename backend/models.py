from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# Auth Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    name: str
    role: str
    created_at: datetime

    class Config:
        populate_by_name = True

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

# Settings Models
class SettingsUpdate(BaseModel):
    companyName: Optional[str] = None
    tagline: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None

class SettingsResponse(BaseModel):
    companyName: str
    tagline: str
    phone: str
    email: str
    location: str

# Service Models
class ServiceCreate(BaseModel):
    icon: str
    title: str
    description: str

class ServiceResponse(BaseModel):
    id: str
    icon: str
    title: str
    description: str

# Review Models
class ReviewCreate(BaseModel):
    rating: int = Field(ge=1, le=5)
    text: str
    author: str

class ReviewResponse(BaseModel):
    id: str
    rating: int
    text: str
    author: str

# Payment Models
class PaymentMethodsUpdate(BaseModel):
    zelle: Optional[str] = None
    cashapp: Optional[str] = None
    venmo: Optional[str] = None

class PaymentMethodsResponse(BaseModel):
    zelle: str
    cashapp: str
    venmo: str

# Social Media Models
class SocialMediaUpdate(BaseModel):
    facebook: Optional[str] = None
    instagram: Optional[str] = None
    twitter: Optional[str] = None
    linkedin: Optional[str] = None
    youtube: Optional[str] = None
    tiktok: Optional[str] = None

class SocialMediaResponse(BaseModel):
    facebook: str
    instagram: str
    twitter: str
    linkedin: str
    youtube: str
    tiktok: str
