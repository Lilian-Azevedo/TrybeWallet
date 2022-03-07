import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE,
  ADD_EDITED_EXPENSE, FETCH_CURRENCIES, CHANGE_KEY } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // totalValue: 0,
  isEditingExpense: false,
  expenseForEdit: '',
  hasClickedEdit: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    /* const { payload: { value, exchangeRates }} = this.action; */
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      /* totalValue: state.totalValue +
        (Number(action.payload.value) * Number(action.payload.exchangeRates[action.payload.currency].ask)) */
    };
  case REMOVE_EXPENSE:
    // const { value, exchangeRates, currency } = state.expenses.find((expense) => expense.id === action.id);
    return {
      ...state,
      /*  totalValue: state.totalValue - (Number(value) * Number(exchangeRates[currency].ask)), */
      // Funciona, mas não sei pq não passa em um dos testes
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditingExpense: true,
      expenseForEdit: state.expenses[action.id],
      hasClickedEdit: true,
    };
  case CHANGE_KEY:
    return {
      ...state,
      hasClickedEdit: false,
    };
  case ADD_EDITED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.expenseForEdit.id) return action.payload;
        return expense;
      }),
      isEditingExpense: false,
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
