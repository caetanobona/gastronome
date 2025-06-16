from typing import Annotated
from fastapi import APIRouter, HTTPException, Query
from schemas.recipe import Recipe as RecipeSchema
from services.recipes_service import get_all_recipes, get_recipe_by_id, insert_recipe
from src.dependencies import SessionDep

router = APIRouter(
    prefix="/recipes",
    tags=["recipes"]
)

@router.get("/")
def get_recipes(session : SessionDep):
  recipes = get_all_recipes(session)
  return recipes

@router.get("/{recipe_id}")
def get_recipe(recipe_id : int, session : SessionDep):
  if recipe_id < 0:
    raise HTTPException(status_code=400, detail="Recipe id must be greater than 0")
  recipe = get_recipe_by_id(recipe_id, session)
  if not recipe:
    raise HTTPException(status_code=404, detail="Recipe not found")
  return recipe

@router.post("/")
def post_recipe(recipe : RecipeSchema, session : SessionDep):
  recipe = insert_recipe(recipe, session)
  return recipe