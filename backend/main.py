from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import ChangeResult


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="TERRASPHERE API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "project": "TERRASPHERE",
        "status": "online"
    }


@app.get("/api/health")
def health():
    return {
        "status": "online",
        "offline": True,
        "database": "connected"
    }


@app.get("/api/results")
def get_results(db: Session = Depends(get_db)):
    results = db.query(ChangeResult).all()

    return [
        {
            "id": result.id,
            "title": result.title,
            "category": result.category,
            "confidence": result.confidence,
            "area_changed_m2": result.area_changed_m2,
            "location_lat": result.location_lat,
            "location_lng": result.location_lng,
            "verification_status": result.verification_status,
        }
        for result in results
    ]


@app.get("/api/results/{result_id}")
def get_result(
    result_id: str,
    db: Session = Depends(get_db)
):
    result = (
        db.query(ChangeResult)
        .filter(ChangeResult.id == result_id)
        .first()
    )

    if not result:
        return {
            "error": "Result not found"
        }

    return {
        "id": result.id,
        "title": result.title,
        "category": result.category,
        "confidence": result.confidence,
        "area_changed_m2": result.area_changed_m2,
        "location_lat": result.location_lat,
        "location_lng": result.location_lng,
        "coordinates_str": result.coordinates_str,
        "before_image_url": result.before_image_url,
        "after_image_url": result.after_image_url,
        "change_mask_url": result.change_mask_url,
        "verification_status": result.verification_status,
    }