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
  title : z.string().min(2).max(50),
  description : z.string().min(10).max(200),
  author : z.string().min(2).max(50),
  prepTime : z.coerce.number().positive(),
  tag : z.string().optional()
}))