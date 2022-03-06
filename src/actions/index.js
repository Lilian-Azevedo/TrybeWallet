export const SAVE_USER = 'SAVE_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EDITED_EXPENSE = 'ADD_EDITED_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CHANGE_KEY = 'CHANGE_KEY';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const saveUser = (payload) => (
  { type: SAVE_USER, payload }
);

export const addExpense = (payload) => (
  { type: ADD_EXPENSE, payload }
);

export const removeExpense = (id) => (
  { type: REMOVE_EXPENSE, id }
);

export const editExpense = (id) => (
  { type: EDIT_EXPENSE, id }
);

export const changeKeyEdit = () => (
  { type: CHANGE_KEY }
);

export const addEditedExpense = (payload) => (
  { type: ADD_EDITED_EXPENSE, payload }
);

export const fetchCurrencies = (payload) => (
  { type: FETCH_CURRENCIES, payload }
);

export const thunkWallet = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT; // FONTE: https://igluonline.com/como-remover-uma-propriedade-de-um-objeto-javascript/
  dispatch(fetchCurrencies(data));
};
