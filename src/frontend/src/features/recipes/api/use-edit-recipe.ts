import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import { FAST_API_URL } from "@/config";
import z from "zod";
import { RecipeSchema, type EditRecipeForm, type Recipe } from "../schemas";


export const useEditRecipe = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Recipe,
    Error,
    EditRecipeForm
  >({
    mutationFn: async ( updatedRecipe ) => {
      const response = await axios.put(`${FAST_API_URL}/recipes/${updatedRecipe.id}`, updatedRecipe);

      if(response.status !== 200 && response.status !== 201) {
        throw new Error('Failed to update the recipe');
      }

      const parsedResponse = RecipeSchema.parse(response.data);

      return parsedResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey : ['recipes'] });
    },
  });

  return mutation;
};