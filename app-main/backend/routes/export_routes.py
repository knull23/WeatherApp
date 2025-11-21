from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import csv
import json
import io
import sys
import os
from lxml import etree
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db
from models import WeatherQuery

router = APIRouter(prefix="/export", tags=["export"])

@router.get("/json")
async def export_json(db: AsyncSession = Depends(get_db)):
    """
    Export all weather queries as JSON.
    """
    result = await db.execute(select(WeatherQuery))
    queries = result.scalars().all()
    
    data = []
    for query in queries:
        data.append({
            'id': query.id,
            'location_input': query.location_input,
            'resolved_location': query.resolved_location,
            'start_date': query.start_date.isoformat() if query.start_date else None,
            'end_date': query.end_date.isoformat() if query.end_date else None,
            'weather_result': query.weather_result,
            'created_at': query.created_at.isoformat()
        })
    
    json_str = json.dumps(data, indent=2)
    return Response(
        content=json_str,
        media_type="application/json",
        headers={"Content-Disposition": "attachment; filename=weather_queries.json"}
    )

@router.get("/csv")
async def export_csv(db: AsyncSession = Depends(get_db)):
    """
    Export all weather queries as CSV.
    """
    result = await db.execute(select(WeatherQuery))
    queries = result.scalars().all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write header
    writer.writerow(['ID', 'Location Input', 'Resolved Location', 'Start Date', 'End Date', 'Created At', 'Temperature (°C)', 'Weather'])
    
    # Write data
    for query in queries:
        temp = query.weather_result.get('current', {}).get('main', {}).get('temp', 'N/A')
        weather = query.weather_result.get('current', {}).get('weather', [{}])[0].get('description', 'N/A')
        
        writer.writerow([
            query.id,
            query.location_input,
            query.resolved_location,
            query.start_date.isoformat() if query.start_date else '',
            query.end_date.isoformat() if query.end_date else '',
            query.created_at.isoformat(),
            temp,
            weather
        ])
    
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=weather_queries.csv"}
    )

@router.get("/xml")
async def export_xml(db: AsyncSession = Depends(get_db)):
    """
    Export all weather queries as XML.
    """
    result = await db.execute(select(WeatherQuery))
    queries = result.scalars().all()
    
    root = etree.Element("weather_queries")
    
    for query in queries:
        query_elem = etree.SubElement(root, "query")
        
        etree.SubElement(query_elem, "id").text = str(query.id)
        etree.SubElement(query_elem, "location_input").text = query.location_input
        etree.SubElement(query_elem, "resolved_location").text = query.resolved_location
        etree.SubElement(query_elem, "start_date").text = query.start_date.isoformat() if query.start_date else ""
        etree.SubElement(query_elem, "end_date").text = query.end_date.isoformat() if query.end_date else ""
        etree.SubElement(query_elem, "created_at").text = query.created_at.isoformat()
        
        temp = query.weather_result.get('current', {}).get('main', {}).get('temp', 'N/A')
        weather = query.weather_result.get('current', {}).get('weather', [{}])[0].get('description', 'N/A')
        
        etree.SubElement(query_elem, "temperature").text = str(temp)
        etree.SubElement(query_elem, "weather").text = str(weather)
    
    xml_str = etree.tostring(root, pretty_print=True, xml_declaration=True, encoding='UTF-8')
    
    return Response(
        content=xml_str,
        media_type="application/xml",
        headers={"Content-Disposition": "attachment; filename=weather_queries.xml"}
    )

@router.get("/pdf")
async def export_pdf(db: AsyncSession = Depends(get_db)):
    """
    Export all weather queries as PDF.
    """
    result = await db.execute(select(WeatherQuery))
    queries = result.scalars().all()
    
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []
    
    styles = getSampleStyleSheet()
    title = Paragraph("Weather Queries Report", styles['Title'])
    elements.append(title)
    elements.append(Spacer(1, 12))
    
    # Create table data
    data = [['ID', 'Location', 'Resolved Location', 'Temperature', 'Weather', 'Date']]
    
    for query in queries:
        temp = query.weather_result.get('current', {}).get('main', {}).get('temp', 'N/A')
        weather = query.weather_result.get('current', {}).get('weather', [{}])[0].get('description', 'N/A')
        
        data.append([
            str(query.id),
            query.location_input[:20],
            query.resolved_location[:30],
            f"{temp}°C" if temp != 'N/A' else 'N/A',
            str(weather)[:20],
            query.created_at.strftime('%Y-%m-%d')
        ])
    
    table = Table(data)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    elements.append(table)
    doc.build(elements)
    
    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=weather_queries.pdf"}
    )
