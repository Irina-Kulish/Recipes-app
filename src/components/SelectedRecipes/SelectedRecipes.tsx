import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Meal } from '../../interface/Meal';
import RecipeCardDetail from '../RecipeCardDetail/RecipeCardDetail';
import Modal from '../Modal/Modal';
import { getCombinedIngredients } from '../../utils/ingredients';

interface SelectedRecipesProps {
  selectedRecipes: Meal[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

const SelectedRecipes: React.FC<SelectedRecipesProps> = ({ selectedRecipes, setSelectedRecipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchRecipeDetails = async (id: string) => {
    try {
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (data.meals) {
        setSelectedRecipe(data.meals[0]);
        setIsModalOpen(true);
      } else {
        console.error("Recipe not found");
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  const removeRecipe = (id: string) => {
    setSelectedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.idMeal !== id));
  };

  const combinedIngredients = useMemo(
    () => Object.values(getCombinedIngredients(selectedRecipes)),
    [selectedRecipes]
  );

  return (
    <div className="min-h-screen p-4 text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Selected Recipes</h2>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedRecipes.map(recipe => (
          <div
            key={recipe.idMeal}
            className="bg-white border p-4 cursor-pointer hover:bg-gray-200 rounded shadow text-black"
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-bold">{recipe.strMeal}</h3>
            <p>{recipe.strCategory}</p>
            <p>{recipe.strArea}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => fetchRecipeDetails(recipe.idMeal)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Details
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  removeRecipe(recipe.idMeal);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-4 text-white">Combined Ingredients</h2>
      <ul className="list-disc pl-4 text-white">
        {combinedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {isModalOpen && selectedRecipe && (
        <Modal onClose={closeModal}>
          <RecipeCardDetail recipe={selectedRecipe} />
        </Modal>
      )}
    </div>
  );
};

export default SelectedRecipes;
