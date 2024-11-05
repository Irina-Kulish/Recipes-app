import React from 'react';
import { Link } from 'react-router-dom';
import { Meal } from '../../interface/Meal';
import { removeRecipeById } from '../../utils/helpers';

interface HeaderProps {
  selectedRecipes: Meal[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

const Header: React.FC<HeaderProps> = ({ selectedRecipes, setSelectedRecipes }) => {
  const handleRemove = (idMeal: string) => {
    setSelectedRecipes(prev => removeRecipeById(idMeal, prev));
  };

  return (
    <div className="navbar bg-base-100 bg-opacity-50 backdrop-blur-lg z-50 relative">
      <div className="flex-1">
        <Link 
          to="/" 
          className="btn btn-ghost text-xl"
        >
            Recipe App
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button
            className="btn btn-ghost btn-circle text-3xl p-4 mr-2"
            aria-label="Open cart"
          >
            <div className="indicator">
              <span className="badge badge-sm indicator-item text-lg">{selectedRecipes.length}</span>
              <span role="img" aria-label="cart" className="text-3xl">🛒</span>
            </div>
          </button>
          <div className="dropdown-content card card-compact bg-base-100 z-50 absolute mt-3 w-72 shadow">
            <div className="card-body">
              <h2 className="font-bold">Selected Recipes</h2>
              {selectedRecipes.length > 0 ? (
                <ul>
                  {selectedRecipes.map((recipe) => (
                    <li key={recipe.idMeal} className="flex justify-between">
                      <span>{recipe.strMeal}</span>
                      <button
                        onClick={() => handleRemove(recipe.idMeal)}
                        className="text-red-500 underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No selected recipes</span>
              )}
              <Link 
                to="/selected" 
                className={`btn btn-primary btn-block mt-4 ${selectedRecipes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                tabIndex={selectedRecipes.length === 0 ? -1 : undefined}
                aria-disabled={selectedRecipes.length === 0}
              >
                View Selected Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
