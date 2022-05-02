import { useState } from 'react';
import { useSelector } from 'react-redux';
import usePath from './usePath';

const useCreateInfo = () => {
  const { routeFoods } = usePath();
  const { currentRecipe } = useSelector((state) => state.progress);
  const [info, setInfo] = useState({});
  if (routeFoods) {
    const { idMeal, strMeal, strMealThumb } = currentRecipe;
    setInfo({ page: `/foods/${idMeal}`, name: strMeal, img: strMealThumb });
  }

  if (!routeFoods) {
    const { idDrink, strDrink, strDrinkThumb } = currentRecipe;
    setInfo({ page: `/drinks/${idDrink}`, name: strDrink, img: strDrinkThumb });
  }
  return { info };
};

export default useCreateInfo;
