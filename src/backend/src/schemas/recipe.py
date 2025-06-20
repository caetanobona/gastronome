from pydantic import BaseModel, Field
class Recipe(BaseModel):
  title: str = Field(..., min_length=2, max_length=50)
  description: str = Field(..., min_length=10, max_length=200)
  author: str = Field(..., min_length=2, max_length=50)
  prepTime: int = Field(..., gt=0)
  tag: str | None = None

class EditRecipe(Recipe):
  id: int = Field(..., gt=0)