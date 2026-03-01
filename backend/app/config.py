from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # App Settings
    app_name: str = "dudedid task management backend"
    debug: bool = False
    environment: str = "production"
    
    # Database
    database_url: str = "sqlite:///./dudedid.db"
    
    # Security
    secret_key: str = "abcdef"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # API Settings
    api_prefix: str = "/api/v1"
    version: str = "1.0.0"
    allowed_hosts: str = "*"
    
    # Email (optional)
    smtp_host: Optional[str] = None
    smtp_port: Optional[int] = None
    smtp_user: Optional[str] = None
    smtp_password: Optional[str] = None
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )

# Create single instance
settings = Settings()