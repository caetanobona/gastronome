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
import { TypedCreateRecipeFormSchema } from '../schemas'
import { useCreateRecipe } from '../api/use-create-recipe'
import { ref, computed, watch } from 'vue'
import { useEditRecipe } from '../api/use-edit-recipe'
import type { RecipeVue } from '../types'

const props = withDefaults(
  defineProps<{
    open?: boolean | undefined
    recipe?: RecipeVue
    hideTrigger?: boolean
    edit?: boolean
  }>(),
  {
    open: undefined,
  },
)

const internalOpen = ref(false)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isControlled = (): boolean => {
  return props.open !== undefined
}

const isOpen = computed({
  get: () => (isControlled() ? props.open : internalOpen.value),
  set: (value: boolean) =>
    isControlled() ? emit('update:open', value) : (internalOpen.value = value),
})

const createMutation = useCreateRecipe()
const editMutation = useEditRecipe()

watch(isOpen, (open) => {
  if (open) {
    form.resetForm({
      values: getFormValuesFromProps(),
    })
  } else {
    form.resetForm()
  }
})

const getFormValuesFromProps = () => ({
  title: props.recipe?.title || '',
  description: props.recipe?.description || '',
  author: props.recipe?.author || '',
  prepTime: props.recipe?.prepTime || 0,
  tag: props.recipe?.tag || '',
})

const form = useForm({
  validationSchema: TypedCreateRecipeFormSchema,
  initialValues: getFormValuesFromProps(),
})

const onSubmit = form.handleSubmit(async (values) => {
  const finalValues = {
    ...values,
    tag: values.tag || null,
  }

  const mutationOptions = {
    onSuccess: () => {
      isOpen.value = false
      form.resetForm()
    }
  }

  if (props.edit && props.recipe?.id) {
    const valuesWithId = { ...finalValues, id: props.recipe.id }
    editMutation.mutate(valuesWithId, mutationOptions)
  } else {
    createMutation.mutate(finalValues, mutationOptions)
  }
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
          <DialogTitle> {{ props.edit ? 'Edit Recipe' : 'Add a new Recipe' }} </DialogTitle>
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
