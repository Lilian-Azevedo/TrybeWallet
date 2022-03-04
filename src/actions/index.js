export const SAVE_USER = 'SAVE_USER';

export const saveUser = (payload) => (
  { type: SAVE_USER, payload }
);

/* export function thunkWalletUser() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
}; */
