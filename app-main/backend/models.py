from sqlalchemy import Column, Integer, String, DateTime, JSON, Date
from database import Base
from datetime import datetime, timezone
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import date

class WeatherQuery(Base):
    __tablename__ = "weather_queries"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    location_input = Column(String, nullable=False)
    resolved_location = Column(String, nullable=False)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    weather_result = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

# Pydantic models
class WeatherQueryCreate(BaseModel):
    location_input: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class WeatherQueryUpdate(BaseModel):
    location_input: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class WeatherQueryResponse(BaseModel):
    id: int
    location_input: str
    resolved_location: str
    start_date: Optional[date]
    end_date: Optional[date]
    weather_result: Dict[Any, Any]
    created_at: datetime
    
    class Config:
        from_attributes = True
