<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'

const props = defineProps(['title', 'description', 'author', 'tag', 'likes'])

</script>

<template>
  <Card class="shadow-none border-none py-0">
    <div class="relative mb-6">
      <div class="aspect-[4/3] relative overflow-hidden bg-gray-100">
        <img 
          src="../../../assets/placeholder.svg"
          fill
          class="object-cover transition-minimal group-hover:scale-105"
        />
      </div>
    </div>

    <div class="">
      <h3 class="text-lg font-medium text-gray-900 pb-3">{{ title }}</h3>
      <p class="text-sm text-gray-600 pb-3">{{ description }}</p>

      <div class="flex justify-between pt-2">
        <div class="flex text-gray-500 text-xs">
          <p>by {{ author }}</p>
        </div>
        <div class="flex">
          
          <p>{{ likes }}</p>
        </div>
        
      </div>
    </div>
  </Card>
</template>