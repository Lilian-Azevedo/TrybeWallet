import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usePath from '../../hooks/usePath';
import requestServer from '../../services/requests';
// import FiltersCategory from '../FiltersCategory';

const ButtonsMainPage = () => {
  // const dispatch = useDispatch();
  const { endpointFoodFilters,
    endpointDrinkFilters } = useSelector((state) => state.recipes);
  const { routeFoods, linkPath } = usePath();
  const [restaure, setRestaure] = useState(false);
  const [filtersCategory, setFilterCategory] = useState([]);
  const MAXIMUN_FILTERS = 5;

  const verifyEndpointFilters = () => {
    if (routeFoods) return endpointFoodFilters;
    return endpointDrinkFilters;
  };
  const verifyType = (filtered) => {
    let type = '';
    if (filtered.filterBy === 'category') {
      setRestaure(true);
      type = 'filter.php?c';
    }
    if (filtered.filterBy === 'ingredient') type = 'filter.php?i';
    if (filtered.filterBy === 'name') type = 'search.php?s';
    if (filtered.filterBy === 'firstLetter') type = 'search.php?f';

    return `https://www.${linkPath}.com/api/json/v1/1/${type}=${filtered.searchInput}`;
  };

  const handleDataResults = (filtered) => {
    if (filtered.searchInput === 'all' || (filtered.filterBy === 'category'
      && restaure && filtered.searchInput === filter.searchInput)) {
      setRestaure(false);
      setData(checkRoute());
      return false;
    }
    setEndpoint(verifyType(filtered));
  };

  useEffect(() => {
    const requestAPI = async () => {
      const responseFilters = await requestServer(verifyEndpointFilters());
      const type = (responseFilters.meals ? responseFilters.meals : results.drinks);
      setFilterCategory(type);
    };
    requestAPI();
  }, []);

  return (
    <form>
      <button
        data-testid="All-category-filter"
        onClick={ () => handleDataResults({ searchInput: 'all',
          filterBy: 'category' }) }
        type="button"
      >
        All
      </button>
      { filtersCategory.map(({ strCategory }, index) => index < MAXIMUN_FILTERS && (
        <div key={ Math.random() } id={ index }>
          <button
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleDataResults({ searchInput: strCategory,
              filterBy: 'category' }) }
            type="button"
          >
            { strCategory }
          </button>
        </div>))}
    </form>);
};

export default ButtonsMainPage;
