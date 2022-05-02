// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// const useIngredientsList = () => {
//   const { currentRecipe } = useSelector((state) => state.progress);
//   const [ingredients, setIngredients] = useState([]);
//   const [measure, setMeasure] = useState([]);
//   const [list, setListIng] = useState([]);

//   // let list = [];
//   useEffect(() => {
//     console.log('entrou aqui mais uma vez');
//     const infoIngredients = Object.keys(currentRecipe);
//     const verifyExistIng = infoIngredients.some((item) => item.includes('strIng'));
//     if (verifyExistIng) {
//       infoIngredients.forEach((element, index) => {
//         const newIngredient = Object.values(currentRecipe)[index];
//         if (element.includes('strIng')
//           && newIngredient !== null && newIngredient.length) {
//           setIngredients((previousIngred) => [...previousIngred, newIngredient]);
//         }
//         if (element.includes('strMeas')
//           && newIngredient !== null && newIngredient.length) {
//           setMeasure((previousMeasure) => [...previousMeasure, newIngredient]);
//         }
//       });
//     }
//     // setListIng(['banana']);
//     console.log(currentRecipe);
//     setListIng(ingredients.map((item, index) => (`${item} - ${measure[index]}`)));
//     console.log(ingredients);
//     // ingredients.forEach((item, index) => list.push(`${item} - ${measure[index]}`));
//   }, [currentRecipe]);

//   return { list, ingredients, measure };
// };

// export default useIngredientsList;
