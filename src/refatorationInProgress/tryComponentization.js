// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// // import { useSelector } from 'react-redux';
// import useIngredientsList from '../hooks/useIngredientsList';
// import usePath from '../hooks/usePath';
// import { addProgressToLocal, getProgressFromLocal } from '../services/localStorage';
// import { validationFinishButton } from '../store/actions';

// const Ingredients = () => {
//   const dispatch = useDispatch();
//   //   const { currentRecipe } = useSelector((state) => state.progress);
//   const { list, ingredients } = useIngredientsList();
//   console.log(list);
//   const [checked, setChecked] = useState([]);
//   //   const [isLoading, setIsLoading] = useState(true);
//   const { id, routeFoods } = usePath();

//   const verifyIDLocalStorage = (newDataIng) => {
//     let newChecked = newDataIng.slice();
//     let key = '';
//     if (routeFoods) key = 'meals';
//     if (!routeFoods) key = 'cocktails';

//     const progress = localStorage.getItem('inProgressRecipes');
//     if (!progress) {
//       setChecked(newChecked.fill(false));
//       return false;
//     }
//     const results = getProgressFromLocal()[key];
//     if (!results || !results[id]) {
//       setChecked(newChecked.fill(false));
//       return false;
//     }
//     const stepsCheckedBefore = results[id];
//     newChecked = newChecked.map((_item, index) => {
//       let isCheck = false;
//       stepsCheckedBefore.forEach((itemCheck) => {
//         if (itemCheck === index) isCheck = true;
//       });
//       return isCheck;
//     });
//     setChecked(newChecked);
//   };

//   useEffect(() => {
//     verifyIDLocalStorage(ingredients);
//   }, []);

//   const handleValidationFinish = (newChecked) => {
//     const isAllChecked = newChecked.every((element) => element === true);
//     dispatch(validationFinishButton(!isAllChecked));
//   };

//   const handleLocalStorageUpdate = (newChecked) => {
//     let key = '';
//     if (routeFoods) key = 'meals';
//     if (!routeFoods) key = 'cocktails';
//     const allCheckedStep = newChecked.map((item, index) => (item && index))
//       .filter((item) => item !== false);
//     addProgressToLocal(key, { id, ingredients: allCheckedStep });
//   };

//   const handleCheckbox = (index) => {
//     const newChecked = checked
//       .map((element, indexCheck) => (indexCheck === index ? !element : element));
//     setChecked(newChecked);
//     handleValidationFinish(newChecked);
//     handleLocalStorageUpdate(newChecked);
//   };

//   console.log(list);
//   return (
//     <div>
//       { list.map((item, index) => (
//         <div key={ index } data-testid={ `${index}-ingredient-step` }>
//           <input
//             id={ item }
//             type="checkbox"
//             onChange={ () => handleCheckbox(index) }
//             checked={ checked[index] }
//             value={ checked[index] }
//           />
//           <label
//             htmlFor={ item }
//             style={ checked[index] ? { textDecoration: 'line-through' }
//               : { textDecoration: 'none' } }
//           >
//             {`${list[index]}`}
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default Ingredients;
// // Continua com bug, duplica a lista de ingredients
