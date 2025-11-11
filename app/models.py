
from sqlalchemy import Column, Integer, String, Text, DateTime, Float
from datetime import datetime
from app.db import Base

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    vendor = Column(String, nullable=True)
    tax_id = Column(String, nullable=True)
    total_amount = Column(Float, nullable=True)
    date = Column(String, nullable=True)
    raw_text = Column(Text, nullable=True)
    parsed_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def as_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "vendor": self.vendor,
            "tax_id": self.tax_id,
            "total_amount": self.total_amount,
            "date": self.date,
            "raw_text": self.raw_text,
            "parsed_json": self.parsed_json,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
