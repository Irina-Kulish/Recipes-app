import { Meal } from '../interface/Meal';

export const getCombinedIngredients = (recipes: Meal | Meal[]): string[] => {
  const ingredients: { [key: string]: string } = {};

  const recipeArray = Array.isArray(recipes) ? recipes : [recipes];

  recipeArray.forEach((recipe) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = String(recipe[`strIngredient${i}`] ?? "");
      const measure = String(recipe[`strMeasure${i}`] ?? "");
      if (ingredient) {
        ingredients[ingredient] = ingredients[ingredient]
          ? `${ingredients[ingredient]}, ${measure}`
          : measure;
      }
    }
  });

  return Object.entries(ingredients).map(([ingredient, measure]) => `${ingredient} - ${measure}`);
};
