<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import RecipesFeed from "./features/recipes/components/RecipesFeed.vue";

</script>

<template>
  <Navbar />
  <div class="bg-white flex justify-center">
    <div class="max-w-7xl w-full">
      <RecipesFeed />
    </div>
  </div>
</template>