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
      <div class="absolute top-4 right-4 flex gap-2 transition-minimal">
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
            <DropdownMenuItem class="rounded-none">Edit</DropdownMenuItem>
            <DropdownMenuItem class="rounded-none">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
