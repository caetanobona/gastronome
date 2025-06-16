from src.models.recipe import Recipe as RecipeModel
from src.schemas.recipe import Recipe as RecipeSchema
from sqlmodel import Session, select
from src.dependencies import SessionDep

def get_all_recipes(session : Session):
    recipes = session.exec(select(RecipeModel)).all()
    return recipes

def get_recipe_by_id(recipe_id : int, session : Session) -> RecipeSchema | None:
    recipe = session.exec(select(RecipeModel)).first() # TODO -> IMPLEMENT FILTER LOGIC
    return recipe

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
    session.refresh(recipe_model) # needed to generate the id in the database

    return recipe