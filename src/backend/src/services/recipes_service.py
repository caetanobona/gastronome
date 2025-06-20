from src.models.recipe import Recipe as RecipeModel
from src.schemas.recipe import Recipe as RecipeSchema, EditRecipe as EditRecipeSchema
from fastapi import HTTPException
from sqlmodel import Session, select

def get_all_recipes(session : Session):
    recipes = session.exec(select(RecipeModel)).all()
    return recipes

def get_recipe_by_id(recipe_id : int, session : Session) -> RecipeSchema | None:
    if recipe_id < 0:
        raise HTTPException(status_code=400, detail="Recipe id must be greater than 0")
    recipe = session.get(RecipeModel, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    recipe_schema = RecipeSchema(
        title=recipe.title,
        description=recipe.description,
        author=recipe.author,
        prepTime=recipe.prepTime,
        tag=recipe.tag,
    )

    return recipe_schema

def insert_recipe(recipe: RecipeSchema, session : Session) -> RecipeSchema:
    recipe_model = RecipeModel(
        title=recipe.title,
        description=recipe.description,
        author=recipe.author,
        prepTime=recipe.prepTime,
        tag=recipe.tag,
    )

    session.add(recipe_model)
    session.commit()
    session.refresh(recipe_model) # generates the id in the database

    return recipe

def delete_recipe_by_id(recipe_id : int, session : Session):
    if recipe_id < 0:
        raise HTTPException(status_code=400, detail="Recipe id must be greater than 0")

    recipe = session.get(RecipeModel, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    session.delete(recipe)
    session.commit()

    return None

def update_recipe_by_id(recipe_id : int, edited_recipe : EditRecipeSchema, session : Session):
    if recipe_id < 0:
        raise HTTPException(status_code=400, detail="Recipe id must be greater than 0")

    recipe = session.get(RecipeModel, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    recipe.title = edited_recipe.title
    recipe.description = edited_recipe.description
    recipe.author = edited_recipe.author
    recipe.prepTime = edited_recipe.prepTime
    recipe.tag = edited_recipe.tag

    session.commit()
    session.refresh(recipe)

    return recipe