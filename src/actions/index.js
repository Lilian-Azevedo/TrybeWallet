export const SAVE_USER = 'SAVE_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const saveUser = (payload) => (
  { type: SAVE_USER, payload }
);

export const addExpense = (payload) => (
  { type: ADD_EXPENSE, payload }
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
