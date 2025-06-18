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
import { ref, computed } from 'vue'
import type { Recipe } from '../types'

const props = withDefaults(defineProps<{
  open?: boolean | undefined,
  recipe?: Recipe,
  hideTrigger?: boolean
}>(), {
  open: undefined
})

console.log(`props.open, props.recipe, props.hideTrigger: ${props.open} ${props.recipe} ${props.hideTrigger}`)

const internalOpen = ref(false)

const emit = defineEmits<{  
  'update:open': [value: boolean]  
}>()

const isOpenProp = ():boolean => {
  console.log(`isOpenProp: ${'open' in props ? true : false}`)
  return 'open' in props ? true : false
}

const isOpen = computed({  
  get: () => isOpenProp() ? props.open : internalOpen.value,  
  set: (value : boolean) => isOpenProp() ? emit('update:open', value) : internalOpen.value = value
})

const { mutate } = useCreateRecipe()

const form = useForm({
  validationSchema: CreateRecipeFormSchema,
  initialValues: {
    title: props.recipe?.title || '',  
    description: props.recipe?.description || '',  
    author: props.recipe?.author || '',  
    prepTime: props.recipe?.prepTime || 0,  
    tag: props.recipe?.tag || '',
  }
})

const onSubmit = form.handleSubmit((values) => {
  const finalValues = {
    ...values,
    tag : values.tag == undefined ? null : values.tag
  }

  mutate(finalValues, {
    onSuccess: () => {
      isOpen.value = false
      form.resetForm()
    }
  })
})

const handleCancel = () => {
  isOpen.value = false
}

</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger v-if="!hideTrigger" asChild>
      <Button
        class="rounded-none cursor-pointer border border-white hover:text-gray-950 hover:bg-white hover:border-gray-950"
      >
        Add Recipe
      </Button>
    </DialogTrigger>
    <DialogContent>
      <form @submit="onSubmit">
        <DialogHeader class="pb-6">
          <DialogTitle> Add a new recipe </DialogTitle>
        </DialogHeader>

        <div class="pb-4">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Title"
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
                  placeholder="Description"
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
                  placeholder="Author"
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
                >Preparation Time <span class="text-gray-400 text-xs">(in minutes)</span></FormLabel
              >
              <FormControl>
                <Input
                  type="number"
                  placeholder="Preparation Time in Minutes"
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
              <FormLabel>Tag <span class="text-gray-400 text-xs">optional</span></FormLabel>
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
            @click="handleCancel"
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
