import z from 'zod/v4'

export const RecipeSchema = z.object({
  title : z.string(),
  description : z.string(),
  author : z.string(),
  prepTime : z.number(),
  tag : z.string().optional().nullable()
})