<script setup lang="ts">
import RecipeCard from '@/features/recipes/components/RecipeCard.vue'
import { useGetRecipes } from '@/features/recipes/api/use-get-recipes';

const { data: recipes } = useGetRecipes();

</script>

<template>
  <div class="px-6 py-16 mx-auto">
    <div class="flex items-center justify-between pb-12">
      <div class="items-center">
        <h1 class="text-2xl font-light text-gray-900 pb-2">Latest Recipes</h1>
        <!-- <p class="text-sm text-gray-500">{{ recipes.length }} {{ recipes.length > 1 ? 'recipes' : 'recipe' }}</p> -->
      </div>
      
      <div>
        OrderBy select
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      <RecipeCard 
        v-for="recipe in recipes"
        :title="recipe.title"
        :description="recipe.description"
        :author="recipe.author"
        :tag="recipe.tag"
      />
    </div>
  </div>
</template>
