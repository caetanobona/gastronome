import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetRecipes = () => {
  const query = useQuery({
    queryKey : ['recipes'],
    queryFn : async () => {
      const response = await axios.get(`http://127.0.0.1:8000/recipes`)

      if(response.data == null) {
        throw new Error("Failed to fetch recipes")
      }
      
      return response.data
    }
  })

  return query
}