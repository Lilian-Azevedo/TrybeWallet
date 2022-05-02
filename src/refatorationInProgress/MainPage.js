// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { capitalize } from 'lodash';
// import { saveFilters, saveFoodsAndDrinks } from '../store/actions';
// import requestServer from '../services/requests';
// import Header from '../components/Header';
// import CardRecipes from '../components/CardRecipes';
// import SearchHeader from '../components/SearchHeader';
// import FiltersCategory from '../components/FiltersCategory';
// import Footer from '../components/Footer';

// const MainPage = () => {
//   const dispatch = useDispatch();
//   const { endpointFoodInitial,
//     endpointFoodFilters, endpointDrinkInitial,
//     endpointDrinkFilters, recipesFounded,
//     filters } = useSelector((state) => state.recipes);
//   const { push, location: { pathname } } = useHistory();

//   const checkEndpoint = () => (pathname === '/foods' ? endpointFoodInitial : endpointDrinkInitial);

//   const checkFilters = () => (pathname === '/foods' ? filters.foods : filters.drinks);

//   const checkRoute = () => {
//     if (pathname === '/foods') {
//       setTypesRecipes({ id: 'idMeal',
//         urlRoute: 'themealdb',
//         recipeType: 'meals',
//         currentPage: 'foods' });
//       return recipesFounded.foods;
//     }
//     setTypesRecipes({ id: 'idDrink',
//       urlRoute: 'thecocktaildb',
//       recipeType: 'drinks',
//       currentPage: 'drinks' });
//     return recipesFounded.drinks;
//   };
//   const [typesRecipes, setTypesRecipes] = useState({});
//   const [data, setData] = useState(checkRoute());
//   const [filtersCategory, setFiltersCategory] = useState(checkFilters());
//   const [endpoint, setEndpoint] = useState(checkEndpoint());

//   const [filter, setFilter] = useState({});
//   const [isVisibleSearch, setIsVisibleSearch] = useState(false);
//   const [restaure, setRestaure] = useState(false);

//   const MAXIMUN = 12;
//   const MAXIMUN_FILTERS = 5;
//   const isVisible = true;

//   const verifyType = (filtered) => {
//     let type = '';
//     const { urlRoute } = typesRecipes;
//     if (filtered.filterBy === 'category') {
//       setRestaure(true);
//       type = 'filter.php?c';
//     }
//     if (filtered.filterBy === 'ingredient') type = 'filter.php?i';
//     if (filtered.filterBy === 'name') type = 'search.php?s';
//     if (filtered.filterBy === 'firstLetter') type = 'search.php?f';

//     return `https://www.${urlRoute}.com/api/json/v1/1/${type}=${filtered.searchInput}`;
//   };

//   const handleDataResults = (filtered) => {
//     if (filtered.searchInput === 'all' || (filtered.filterBy === 'category'
//       && restaure && filtered.searchInput === filter.searchInput)) {
//       setRestaure(false);
//       setData(checkRoute());
//       return false;
//     }
//     setFilter(filtered);
//     setEndpoint(verifyType(filtered));
//   };

//   const toggleSearch = () => {
//     if (isVisibleSearch === true) { setIsVisibleSearch(false); }
//     if (isVisibleSearch === false) { setIsVisibleSearch(true); }
//   };

//   useEffect(() => {
//     const { currentPage } = typesRecipes;
//     const requestAPI = async () => {
//       const results = await requestServer(endpoint);
//       const typeRecipe = (pathname === '/foods' ? results.meals : results.drinks);
//       const filters = await requestServer(filtersCategory);
//       const typeFilters = (pathname === '/foods' ? filters.meals : filters.drinks);
//       setData(typeRecipe);
//       setFiltersCategory(filters);
//       dispatch(saveFoodsAndDrinks({ [currentPage]: typeRecipe }));
//       dispatch(saveFilters({ [currentPage]: typeFilters }));
//     };
//     requestAPI();
//   }, []);

//   useEffect(() => {
//     const { currentPage } = typesRecipes;
//     if (recipesFounded[currentPage].length) {
//       const typeRecype = (pathname === '/foods' ? recipesFounded.foods : recipesFounded.drinks);
//       const typeId = (pathname === '/foods'
//         ? typeRecype[0].idMeal : typeRecype[0].idDrink);
//       if (typeRecype === null) {
//         global.alert('Sorry, we haven\'t found any recipes for these filters.');
//         return false;
//       }
//       if (typeRecype.length === 1 && filter.filterBy !== 'category') {
//         push(`/${currentPage}/${typeId}`);
//       } else {
//         setData(typeRecype);
//         return false;
//       }
//     }
//     const requestAPI = async () => {
//       const results = await requestServer(endpoint);
//       const typeRecype = (pathname === '/foods' ? results.meals : results.drinks);
//       const typeId = (pathname === '/foods'
//         ? typeRecype[0].idMeal : typeRecype[0].idDrink);

//       if (typeRecype === null) {
//         global.alert('Sorry, we haven\'t found any recipes for these filters.');
//         return false;
//       }
//       if (typeRecype.length === 1 && filter.filterBy !== 'category') {
//         push(`/${currentPage}/${typeId}`);
//       } else {
//         setData(typeRecype);
//       }
//     };
//     requestAPI();
//   }, [filter, restaure]);

//   return (
//     <div>
//       <Header
//         label={ capitalize(typesRecipes.currentPage) }
//         isVisible={ isVisible }
//         toggleSearch={ toggleSearch }
//       />
//       { isVisibleSearch && (
//         <SearchHeader
//           handleDataResults={ handleDataResults }
//         />
//       )}
//       <div>
//         <button
//           data-testid="All-category-filter"
//           onClick={ () => handleDataResults({ searchInput: 'all',
//             filterBy: 'category' }) }
//           type="button"
//         >
//           All
//         </button>
//         { filtersCategory
//           .map((filterName, index) => index < MAXIMUN_FILTERS && (
//             <div key={ Math.random() } id={ index }>
//               <FiltersCategory
//                 { ...filterName }
//                 handleDataResults={ handleDataResults }
//               />
//             </div>))}
//       </div>
//       <div>
//         { data.map((infoRecipe, index) => index < MAXIMUN && (
//           <div key={ Math.random() } id={ index }>
//             <CardRecipes
//               type={ pathname }
//               { ...infoRecipe }
//               index={ index }
//             />
//           </div>))}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MainPage;
