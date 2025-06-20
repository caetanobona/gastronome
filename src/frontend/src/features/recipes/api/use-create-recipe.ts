import { useMutation, useQueryClient } from "@tanstack/vue-query"
import axios from "axios"
import { FAST_API_URL } from "@/config"
import z from "zod"
import { RecipeSchema, type CreateRecipeForm, type Recipe } from "../schemas"

export const useCreateRecipe = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    Recipe,
    Error,
    CreateRecipeForm
  >({
    mutationFn: async ( form ) => {
      const response = await axios.post(`${FAST_API_URL}/recipes`, form)

      if(response.status != 200) {
        throw new Error(`Failed to create recipe: ${response.data}`)
      }

      const parsedResponse = RecipeSchema.parse(response.data)

      return parsedResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
    }
  })

  return mutation
}