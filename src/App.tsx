import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import SelectedRecipes from './components/SelectedRecipes/SelectedRecipes';
import Header from './components/Header/Header';
import { Meal } from './interface/Meal';
import './index.css';

const App: React.FC = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      <Header selectedRecipes={selectedRecipes} setSelectedRecipes={setSelectedRecipes} />
      <div className="p-4 flex-grow bg-opacity-90" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Routes>
          <Route
            path="/"
            element={
              <RecipeList
                selectedRecipes={selectedRecipes}
                setSelectedRecipes={setSelectedRecipes}
              />
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetails
                selectedRecipes={selectedRecipes}
                setSelectedRecipes={setSelectedRecipes}
              />
            }
          />
          <Route
            path="/selected"
            element={
              <SelectedRecipes
                selectedRecipes={selectedRecipes}
                setSelectedRecipes={setSelectedRecipes}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
