import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
  };
  isSelected?: boolean;
  onSelect?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal, isSelected, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 bg-slate-400 transform transition duration-300 hover:scale-105">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-bold text-white">{meal.strMeal}</h2>
      <p className="text-white">{meal.strCategory}</p>
      <p className="text-white">{meal.strArea}</p>
      <div className="mt-2 flex space-x-2">
        {onSelect && (
          <button onClick={onSelect} className="p-1 bg-blue-500 text-white rounded">
            {isSelected ? 'Remove from Selected' : 'Select'}
          </button>
        )}
        <button
          onClick={() => navigate(`/recipe/${meal.idMeal}`)}
          className="p-1 bg-green-500 text-white rounded"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
