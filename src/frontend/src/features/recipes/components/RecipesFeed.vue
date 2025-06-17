<script setup lang="ts">
import RecipeCard from '@/features/recipes/components/RecipeCard.vue'
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { useGetRecipes } from '../api/use-get-recipes';

const { isPending, isError, data, error, } = useGetRecipes();

</script>

<template>
  <div class="px-6 py-16 mx-auto">
    <div class="flex items-center justify-between pb-12">
      <div class="items-center">
        <h1 class="text-2xl font-light text-gray-900 pb-2">Latest Recipes</h1>
        <p class="text-sm text-gray-500">{{ data.length }} {{ data.length > 1 ? 'recipes' : 'recipe' }}</p>
      </div>
      
      <div>
        OrderBy select
      </div>
    </div>

    <div v-if="isPending">Loading...</div> <!-- TODO: Implement use of Skeletons  -->
    <div v-else-if="isError">Error: {{ error?.message }}</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      <RecipeCard 
        v-for="recipe in data"
        :key="recipe.tag"
        :title="recipe.title"
        :description="recipe.description"
        :author="recipe.author"
        :tag="recipe.tag"
      />
    </div>
  </div>
</template>
