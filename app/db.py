
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FOLDER = os.path.normpath(os.path.join(BASE_DIR, "..", "data"))
os.makedirs(DB_FOLDER, exist_ok=True)
DATABASE_URL = "sqlite:///" + os.path.join(DB_FOLDER, "invoices.db").replace("\\", "/")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
