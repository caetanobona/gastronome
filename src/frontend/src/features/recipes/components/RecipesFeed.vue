<script setup lang="ts">
import RecipeCard from '@/features/recipes/components/RecipeCard.vue'
import { useGetRecipes } from '../api/use-get-recipes'
import { computed, ref, watch } from 'vue'
import type { RecipeVue } from '../types'
import RecipeDialogForm from '@/features/recipes/components/RecipeDialogForm.vue'
import { Select, SelectTrigger } from '@/components/ui/select'
import { useSearchQuery } from '@/composables/useSearch'

const { searchQuery } = useSearchQuery()

const recipes = ref<RecipeVue[]>([])

const { isPending, isError, data, error } = useGetRecipes()

watch(data, (newData) => {
  if (newData) {
    recipes.value = newData
  }
})

const filteredRecipes = computed(() => {
  const searchTerm = searchQuery.value.toLowerCase()
  return recipes.value.filter(recipe => recipe.title.toLowerCase().includes(searchTerm))
})

const recipeCount = computed(() => filteredRecipes.value.length)
</script>

<template>
  <div class="px-6 py-16 mx-auto">
    <div class="flex items-center justify-between pb-12">
      <div class="items-center">
        <h1 class="text-2xl font-light text-gray-900 pb-2">Latest Recipes</h1>
        <p class="text-sm text-gray-500">
          {{ recipeCount }} {{ recipeCount > 1 ? 'recipes' : 'recipe' }}
        </p>
      </div>

      <div class="flex">
        <Select>
          <SelectTrigger class="rounded-none"> Filter by </SelectTrigger>
        </Select>
        <div class="pl-2">
          <RecipeDialogForm />
        </div>
      </div>
    </div>

    <div v-if="isPending">Loading...</div>
    <!-- TODO: Implement use of Skeletons  -->
    <div v-else-if="isError">Error: {{ error?.message }}</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :id="recipe.id"
        :title="recipe.title"
        :description="recipe.description"
        :author="recipe.author"
        :tag="recipe.tag"
        :prep-time="recipe.prepTime"
      />
    </div>
  </div>
</template>
