
from fastapi import APIRouter
from src.schemas.recipe import Recipe as RecipeSchema
from src.services.recipes_service import get_all_recipes, get_recipe_by_id, insert_recipe, delete_recipe_by_id, update_recipe_by_id
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
  recipe = get_recipe_by_id(recipe_id, session)
  return recipe

@router.post("/")
def post_recipe(recipe : RecipeSchema, session : SessionDep):
  recipe = insert_recipe(recipe, session)
  return recipe

@router.delete("/{recipe_id}", status_code=204)
def delete_recipe(recipe_id : int, session : SessionDep):
  delete_recipe_by_id(recipe_id, session)
  return # 204 response

@router.put("/{recipe_id}")
def put_recipe(recipe_id : int, new_recipe : RecipeSchema, session : SessionDep):
  updated_recipe = update_recipe_by_id(recipe_id, new_recipe, session)
  return updated_recipe
