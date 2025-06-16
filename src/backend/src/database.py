import os

from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine
from src import models # making sure models codes runs for table creation

load_dotenv()

DB_USER = os.getenv("DB_USER", 'postgres') # -> default user for postgres databases
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST", "localhost") # -> default host for local databases
DB_PORT = os.getenv("DB_PORT", 5432) # 5432 -> default postgres port
DB_NAME = os.getenv("DB_NAME", "postgres") # -> default postgres database name

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    print('creating database')
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    create_db_and_tables()