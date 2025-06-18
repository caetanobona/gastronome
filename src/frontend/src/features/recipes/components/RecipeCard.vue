<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/card/Card.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import RegisterRecipeDialog from './RegisterRecipeDialog.vue'
import { ref } from 'vue'
import type { Recipe } from '../types'

const props = defineProps<Recipe>()

const editModalOpen = ref(false)

const setEditModalOpen = () => {
  editModalOpen.value = !editModalOpen.value
}
</script>

<template>
  <Card class="group shadow-none border-none py-0 hover-lift transition-minimal">
    <div class="relative mb-6">
      <div class="aspect-[4/3] relative overflow-hidden bg-gray-100">
        <img
          src="../../../assets/placeholder.svg"
          fill
          class="object-cover transition-minimal"
        />
      </div>
      <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-minimal">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/90 hover:bg-white border-0 shadow-sm cursor-pointer items-center justify-center flex"
            >
              <img src="../../../assets/burger-menu.svg" alt="Icon" class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="rounded-none">
            <DropdownMenuItem class="rounded-none" @click="setEditModalOpen">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem class="rounded-none">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    
    <div class="">
      <h3 class="text-lg font-medium text-gray-900 pb-3">{{ props.title }}</h3>
      <p class="text-sm text-gray-600 pb-3">{{ props.description }}</p>
      <div class="flex justify-between pt-2">
        <div class="flex text-gray-500 text-xs">
          <p>by {{ props.author }}</p>
        </div>
      </div>
    </div>

    <RegisterRecipeDialog 
      v-model:open="editModalOpen" 
      :recipe="props" 
      :hideTrigger="true" 
      @update:open="editModalOpen = $event"
    />
  </Card>
</template>
