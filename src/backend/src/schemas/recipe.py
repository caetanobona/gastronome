from pydantic import BaseModel

class Recipe(BaseModel):
  title: str
  description: str
  author: str
  prepTime: int
  tag: str | None