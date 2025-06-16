import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import create_tables
from src.routers import recipes

app = FastAPI(
  title="GastronoMe",
  description="GastronoMe API"
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)
app.include_router(recipes.router, tags=["recipes"])

if __name__ == "__main__":
    create_tables()
    uvicorn.run("main:app")