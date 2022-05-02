import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import WalletExpensesSaved from '../components/WalletExpensesSaved';
import '../styles/header.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className='main-area'>
          <ExpenseForm />
          <WalletExpensesSaved />
        </div>
      </>
    );
  }
}

export default Wallet;
