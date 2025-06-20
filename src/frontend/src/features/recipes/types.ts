export type RecipeVue = {
  id: number;
  title: string;
  description: string;
  author: string;
  prepTime: number;
  tag?: string | null;
};