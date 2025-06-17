<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
</script>

<template>
  <div class="border-b-1 border-gray-100 bg-white flex justify-center">
    <div class="px-6 max-w-7xl w-full">
      <div class="flex items-center justify-between h-16">
        <div>
          <span class="text-lg font-medium">GastronoMe</span>
        </div>
        <div class="py-2">
          <div class="w-80">
            <Input class="bg-white rounded-none" placeholder="Search"/>
          </div>
        </div>
        <div class="">
          User Info
        </div>
      </div>
    </div>
  </div>
</template>