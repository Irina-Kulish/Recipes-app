import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RecipeCardDetail from '../RecipeCardDetail/RecipeCardDetail';
import { Meal } from '../../interface/Meal';

interface RecipeDetailsProps {
  selectedRecipes: Meal[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

const fetchRecipeDetails = async (id: string): Promise<Meal> => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!data.meals || data.meals.length === 0) {
    throw new Error('Recipe not found');
  }
  return data.meals[0];
};

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ selectedRecipes, setSelectedRecipes }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: recipe, isLoading, error } = useQuery<Meal, Error>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeDetails(id as string),
    enabled: !!id,
  });

  const isInCart = selectedRecipes.some((item) => item.idMeal === recipe?.idMeal);

  const toggleCart = () => {
    if (!recipe) return;
    if (isInCart) {
      setSelectedRecipes((prev) => prev.filter((item) => item.idMeal !== recipe.idMeal));
    } else {
      setSelectedRecipes((prev) => [...prev, recipe]);
    }
  };

  if (isLoading) return <div className="text-center text-white">Loading recipe...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading recipe: {error.message}</div>;
  if (!recipe) return <div className="text-center text-white">Recipe not found.</div>;

  return (
    <div className="p-4  min-h-screen text-black">
      <div className="flex justify-end space-x-4 mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
        <button
          onClick={toggleCart}
          className={`px-4 py-2 rounded ${isInCart ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
      <RecipeCardDetail recipe={recipe} />
    </div>
  );
};

export default RecipeDetails;
