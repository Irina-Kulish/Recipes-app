import { Meal } from "../interface/Meal";

export const removeRecipeById = (id: string, recipes: Meal[]): Meal[] => {
    return recipes.filter(recipe => recipe.idMeal !== id);
  };
  