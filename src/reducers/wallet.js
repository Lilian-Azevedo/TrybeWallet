import { ADD_EXPENSE, FETCH_CURRENCIES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case FETCH_CURRENCIES:
    return ({
      ...state,
      currencies: Object.keys(action.payload),
      exchange: action.payload,
    });
  default:
    return state;
  }
};

export default wallet;
