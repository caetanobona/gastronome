import { FAST_API_URL } from "@/config"
import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetRecipes = () => {
  const query = useQuery({
    queryKey : ['recipes'],
    queryFn : async () => {
      console.log('API URL: ', FAST_API_URL)

      const response = await axios.get(`${FAST_API_URL}/recipes`)

      if(response.data == null) {
        throw new Error("Failed to fetch recipes")
      }
      
      return response.data
    }
  })

  return query
}