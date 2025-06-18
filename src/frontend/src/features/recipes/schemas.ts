import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'

export const RecipeSchema = z.object({
  title : z.string(),
  description : z.string(),
  author : z.string(),
  prepTime : z.number(),
  tag : z.string().optional().nullable()
})

export const CreateRecipeFormSchema = toTypedSchema(z.object({
  title : z.string().min(2, "Title must be at least 2 characters long").max(50, "Title must be shorter than 50 characters"),
  description : z.string().min(10, "Description must be at least 10 characters long").max(200, "Description must be shorter than 200 characters long"),
  author : z.string().min(2, "Author name must be at least 2 characters long").max(50, "Author name must be shorter than 50 characters long"),
  prepTime : z.coerce.number().positive("Prep time must be a positive number"),
  tag : z.string().min(2, "Tag must be at least 2 characters long").max(50, "Tag must be shorter than 50 characters").optional()
}))