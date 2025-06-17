<script setup lang="ts">
import { useForm } from 'vee-validate'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddRecipeFormSchema } from '../schemas'

const form = useForm({
  validationSchema: AddRecipeFormSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button
        class="rounded-none cursor-pointer hover:text-gray-950 hover:bg-white hover:border-gray-950 hover:border"
      >
        Add Recipe
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Add a new recipe </DialogTitle>
        <DialogDescription> Form for adding a new recipe </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="pb-4">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Recipe Title"
                  v-bind="componentField"
                  class="rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="pb-4">
          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Recipe Description"
                  v-bind="componentField"
                  class="rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="pb-4">
          <FormField v-slot="{ componentField }" name="author">
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Recipe Author"
                  v-bind="componentField"
                  class="rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="pb-4">
          <FormField v-slot="{ componentField }" name="prepTime">
            <FormItem>
              <FormLabel>Preparation Time <span class="text-gray-500 text-xs">(in minutes)</span></FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Recipe Preparation Time in Minutes"
                  v-bind="componentField"
                  class="rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="pb-4">
          <FormField v-slot="{ componentField }" name="tag">
            <FormItem>
              <FormLabel>Tag <span class="text-gray-500 text-xs">optional</span></FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Recipe Tag"
                  v-bind="componentField"
                  class="rounded-none w-64"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>

      <DialogFooter>
        <Button
          variant="ghost"
          class="rounded-none cursor-pointer border border-white hover:border-gray-950 hover:border"
        >
          Cancel
        </Button>
        <Button
          class="rounded-none cursor-pointer border border-white hover:text-gray-950 hover:bg-white hover:border-gray-950"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
