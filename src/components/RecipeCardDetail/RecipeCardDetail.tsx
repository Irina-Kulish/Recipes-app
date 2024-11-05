import React from 'react';
import { Meal } from '../../interface/Meal';
import { getCombinedIngredients } from '../../utils/ingredients';

interface RecipeCardDetailProps {
  recipe: Meal;
}

const RecipeCardDetail: React.FC<RecipeCardDetailProps> = ({ recipe }) => {
  const ingredients = getCombinedIngredients(recipe);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto relative">
      <h1 className="text-3xl font-bold mb-4 text-center">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb || '/path/to/default/image.jpg'}
        alt={recipe.strMeal}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <p className="text-lg"><strong>Category:</strong> {recipe.strCategory}</p>
      <p className="text-lg"><strong>Region:</strong> {recipe.strArea}</p>

      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
        <p className="leading-relaxed text-justify">{recipe.strInstructions}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc pl-6 space-y-1">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCardDetail;
