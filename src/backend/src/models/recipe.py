from datetime import datetime
from sqlmodel import SQLModel, Field

class Recipe(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(nullable=False)
    description: str = Field(nullable=False)
    author: str = Field(nullable=False)
    prepTime: int = Field(nullable=False)
    tag: str = Field(nullable=True)
    created_at: datetime | None = Field(default_factory=lambda: datetime.now(), nullable=False)