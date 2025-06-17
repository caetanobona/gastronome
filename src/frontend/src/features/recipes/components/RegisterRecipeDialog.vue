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
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CreateRecipeFormSchema } from '../schemas'
import { useCreateRecipe } from '../api/use-create-recipe'
import { ref } from 'vue'

const open = ref(false)

const { mutate } = useCreateRecipe()

const form = useForm({
  validationSchema: CreateRecipeFormSchema,
})

const onSubmit = form.handleSubmit((values) => {
  const finalValues = {
    ...values,
    tag : values.tag == undefined ? null : values.tag
  }

  mutate(finalValues, {
    onSuccess: () => {
      open.value = false
      form.resetForm()
    }
  })
})

</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger asChild>
      <Button
        class="rounded-none cursor-pointer border border-white hover:text-gray-950 hover:bg-white hover:border-gray-950"
      >
        Add Recipe
      </Button>
    </DialogTrigger>
    <DialogContent>
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle> Add a new recipe </DialogTitle>
          <DialogDescription> Form for adding a new recipe </DialogDescription>
        </DialogHeader>

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
              <FormLabel
                >Preparation Time <span class="text-gray-500 text-xs">(in minutes)</span></FormLabel
              >
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

        <DialogFooter>
          <Button
            variant="ghost"
            class="rounded-none cursor-pointer border border-white hover:border-gray-950 hover:border"
            type="reset"
          >
            Cancel
          </Button>
          <Button
            class="rounded-none cursor-pointer border border-white hover:text-gray-950 hover:bg-white hover:border-gray-950"
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
