// Esse reducer será responsável por tratar as informações da pessoa usuária
/* {
    user: {
        email: '',
    },
    wallet: {
        currencies: [],
        expenses: []
    }
} */

import { SAVE_USER } from '../actions/index';

const INITIAL_STATE = {
    user: {
        email: '',
    }
}

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
