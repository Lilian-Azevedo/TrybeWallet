import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import WalletExpensesSaved from '../components/WalletExpensesSaved';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <WalletExpensesSaved />
      </div>
    );
  }
}

export default Wallet;
