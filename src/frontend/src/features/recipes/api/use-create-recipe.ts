import { useMutation, useQueryClient } from "@tanstack/vue-query"
import axios from "axios"
import { FAST_API_URL } from "@/config"
import type { Recipe } from "../types"

export const useCreateRecipe = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    Recipe,
    Error,
    Recipe
  >({
    mutationFn: async ( form ) => {
      console.log('MUTATION - FORM DATA: ', form)

      const response = await axios.post(`${FAST_API_URL}/recipes`, form)

      if(response.status != 200) {
        throw new Error(`Failed to create recipe: ${response.data}`)
      }

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
    }
  })

  return mutation
}