import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const RecipeSchema = z.object({
  id : z.number().positive(),
  title : z.string(),
  description : z.string(),
  author : z.string(),
  prepTime : z.number(),
  tag : z.string().nullable()
})

export const CreateRecipeFormSchema = z.object({
  title : z.string().min(2, "Title must be at least 2 characters long").max(50, "Title must be shorter than 50 characters"),
  description : z.string().min(10, "Description must be at least 10 characters long").max(200, "Description must be shorter than 200 characters long"),
  author : z.string().min(2, "Author name must be at least 2 characters long").max(50, "Author name must be shorter than 50 characters long"),
  prepTime : z.coerce.number().positive("Prep time must be a positive number"),
  tag : z.string().nullable()
})

export const EditRecipeFormSchema = z.object({
  id : z.number().positive("Id must be a positive number"),
  title : z.string().min(2, "Title must be at least 2 characters long").max(50, "Title must be shorter than 50 characters"),
  description : z.string().min(10, "Description must be at least 10 characters long").max(200, "Description must be shorter than 200 characters long"),
  author : z.string().min(2, "Author name must be at least 2 characters long").max(50, "Author name must be shorter than 50 characters long"),
  prepTime : z.coerce.number().positive("Prep time must be a positive number"),
  tag : z.string().nullable()
})

export const TypedCreateRecipeFormSchema = toTypedSchema(CreateRecipeFormSchema)
export const TypedEditRecipeFormSchema = toTypedSchema(EditRecipeFormSchema)

export type CreateRecipeForm = z.infer<typeof CreateRecipeFormSchema>
export type EditRecipeForm = z.infer<typeof EditRecipeFormSchema>

export type Recipe = z.infer<typeof RecipeSchema>