import axios from 'axios';
import { Meal } from '../interface/Meal';
import { Category } from '../interface/Category';

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  return data.meals as Category[];
};

export const fetchRecipes = async (search: string): Promise<Meal[] | null> => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  return data.meals as Meal[] | null;
};
