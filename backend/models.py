from sqlalchemy import Column, String, Float, DateTime
from database import Base


class ChangeResult(Base):
    __tablename__ = "change_results"

    id = Column(String, primary_key=True)
    title = Column(String)
    category = Column(String)
    confidence = Column(Float)
    area_changed_m2 = Column(Float)

    location_lat = Column(Float)
    location_lng = Column(Float)

    coordinates_str = Column(String)

    before_image_url = Column(String)
    after_image_url = Column(String)
    change_mask_url = Column(String)

    verification_status = Column(
        String,
        default="pending"
    )

    created_at = Column(DateTime)