import { FAST_API_URL } from "@/config"
import { useQuery } from "@tanstack/vue-query"
import axios from "axios"
import { RecipeSchema } from "../schemas"
import z from "zod"

export const useGetRecipes = () => {
  const query = useQuery({
    queryKey : ['recipes'],
    queryFn : async () => {
      console.log('API URL: ', FAST_API_URL)

      const response = await axios.get(`${FAST_API_URL}/recipes`)

      if(response.data == null) {
        throw new Error("Failed to fetch recipes")
      }

      const parsedResponse = z.array(RecipeSchema).parse(response.data)
      
      return parsedResponse;
    }
  })

  return query
}