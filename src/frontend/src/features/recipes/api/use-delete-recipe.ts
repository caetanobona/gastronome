import { FAST_API_URL } from "@/config"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import axios from "axios"

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ( id : number ) => {
      const response = await axios.delete(`${FAST_API_URL}/recipes/${id}`)

      if (response.status !== 200 && response.status !== 204) { 
        throw new Error('Failed to delete recipe')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
    }
  })

  return mutation
}