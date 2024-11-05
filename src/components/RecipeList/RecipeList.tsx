import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from '../Pagination/Pagination';
import { Meal } from '../../interface/Meal';
import { fetchCategories, fetchRecipes } from '../../utils/apiHelpers';
import { debounce } from '../../utils/debounce';

interface RecipeListProps {
  selectedRecipes: Meal[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<Meal[]>>;
}

const RecipeList: React.FC<RecipeListProps> = ({ selectedRecipes, setSelectedRecipes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchHandler = debounce((value: string) => {
    setDebouncedSearch(value);
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearchHandler(value);
    setCurrentPage(1);
  };

  const { data: meals, isLoading, error } = useQuery({
    queryKey: ['recipes', debouncedSearch],
    queryFn: () => fetchRecipes(debouncedSearch),
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (meals) {
      setFilteredMeals(
        meals.filter((meal) => {
          const matchesCategory = selectedCategory ? meal.strCategory === selectedCategory : true;
          return matchesCategory;
        })
      );
    } else {
      setFilteredMeals([]);
    }
  }, [meals, selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectRecipe = (recipe: Meal) => {
    setSelectedRecipes((prevSelected) =>
      prevSelected.some((r) => r.idMeal === recipe.idMeal)
        ? prevSelected.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prevSelected, recipe]
    );
  };

  const itemsPerPage = 10;
  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes.</div>;

  return (
    <div className="flex min-h-screen p-4">
      <div className="w-1/4 p-4 border-r">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={handleSearch}
            ref={searchInputRef}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded mb-2"
            disabled={isLoadingCategories}
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-3/4 p-4 flex flex-col justify-between">
        <div>
          {filteredMeals.length === 0 ? (
            <div className="flex items-center justify-center min-h-[70vh]">
                <h3 className="text-3xl font-bold text-center text-gray-500">No results found</h3>
          </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedMeals.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  meal={meal}
                  isSelected={selectedRecipes.some((r) => r.idMeal === meal.idMeal)}
                  onSelect={() => handleSelectRecipe(meal)}
                />
              ))}
            </div>
          )}
        </div>

        {filteredMeals.length > 0 && (
          <div className="mt-4 self-center w-full">
            <Pagination
              totalItems={filteredMeals.length}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
