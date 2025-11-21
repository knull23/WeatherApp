from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from datetime import date
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db
from models import WeatherQuery, WeatherQueryCreate, WeatherQueryUpdate, WeatherQueryResponse
from services.weather_service import get_weather_by_location, resolve_location

router = APIRouter(prefix="/weather", tags=["weather"])

@router.post("/query", response_model=WeatherQueryResponse)
async def create_weather_query(
    query_data: WeatherQueryCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create and store a weather query.
    """
    # Validate dates
    if query_data.start_date and query_data.end_date:
        if query_data.start_date > query_data.end_date:
            raise HTTPException(status_code=400, detail="Start date must be before end date")
    
    # Get weather data
    weather_data, error = get_weather_by_location(query_data.location_input)
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    # Create database record
    db_query = WeatherQuery(
        location_input=query_data.location_input,
        resolved_location=weather_data['location']['display_name'],
        start_date=query_data.start_date,
        end_date=query_data.end_date,
        weather_result=weather_data
    )
    
    db.add(db_query)
    await db.commit()
    await db.refresh(db_query)
    
    return db_query

@router.get("/query", response_model=List[WeatherQueryResponse])
async def get_weather_queries(db: AsyncSession = Depends(get_db)):
    """
    Get all weather queries.
    """
    result = await db.execute(select(WeatherQuery))
    queries = result.scalars().all()
    return queries

@router.get("/query/{query_id}", response_model=WeatherQueryResponse)
async def get_weather_query(
    query_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a single weather query by ID.
    """
    result = await db.execute(select(WeatherQuery).where(WeatherQuery.id == query_id))
    query = result.scalar_one_or_none()
    
    if not query:
        raise HTTPException(status_code=404, detail="Weather query not found")
    
    return query

@router.put("/query/{query_id}", response_model=WeatherQueryResponse)
async def update_weather_query(
    query_id: int,
    update_data: WeatherQueryUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update a weather query.
    """
    result = await db.execute(select(WeatherQuery).where(WeatherQuery.id == query_id))
    db_query = result.scalar_one_or_none()
    
    if not db_query:
        raise HTTPException(status_code=404, detail="Weather query not found")
    
    # Update location if provided
    location_input = update_data.location_input or db_query.location_input
    start_date = update_data.start_date if update_data.start_date is not None else db_query.start_date
    end_date = update_data.end_date if update_data.end_date is not None else db_query.end_date
    
    # Validate dates
    if start_date and end_date:
        if start_date > end_date:
            raise HTTPException(status_code=400, detail="Start date must be before end date")
    
    # Fetch new weather data
    weather_data, error = get_weather_by_location(location_input)
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    # Update record
    db_query.location_input = location_input
    db_query.resolved_location = weather_data['location']['display_name']
    db_query.start_date = start_date
    db_query.end_date = end_date
    db_query.weather_result = weather_data
    
    await db.commit()
    await db.refresh(db_query)
    
    return db_query

@router.delete("/query/{query_id}")
async def delete_weather_query(
    query_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Delete a weather query.
    """
    result = await db.execute(select(WeatherQuery).where(WeatherQuery.id == query_id))
    db_query = result.scalar_one_or_none()
    
    if not db_query:
        raise HTTPException(status_code=404, detail="Weather query not found")
    
    await db.delete(db_query)
    await db.commit()
    
    return {"message": "Weather query deleted successfully"}

@router.get("/live")
async def get_live_weather(location: str = Query(..., description="Location to search")):
    """
    Get live weather without storing in database.
    """
    weather_data, error = get_weather_by_location(location)
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    return weather_data

@router.get("/forecast")
async def get_weather_forecast(location: str = Query(..., description="Location to search")):
    """
    Get 5-day forecast without storing in database.
    """
    weather_data, error = get_weather_by_location(location)
    if error:
        raise HTTPException(status_code=400, detail=error)
    
    return weather_data.get('forecast', {})
