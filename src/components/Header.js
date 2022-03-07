import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import '../styles/header.css';

class Header extends Component {
  expensesTotal = () => {
    const { expenses } = this.props;
    return expenses.reduce((sum, expense) => {
      const { currency, value, exchangeRates } = expense;
      const valueQuotation = Number(exchangeRates[currency].ask);
      const updatedValue = Number(value) * valueQuotation;
      sum += updatedValue;
      return sum;
    }, 0);
  }

  render() {
    /* const { userInfo, totalValue } = this.props; */
    const { userInfo } = this.props;

    return (
      <header data-testid="header-component" className="header">
        <div>
          <h2>TrybeWallet</h2>
        </div>
        <div className="container-info">
          <h4 data-testid="email-field">{ userInfo }</h4>
          {/* <h4 data-testid="total-field">{ totalValue > 0
            ? totalValue.toFixed(2) : 0}</h4> */}
          <h4 data-testid="total-field">{ this.expensesTotal() }</h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </div>
      </header>);
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  userInfo: email,
  expenses,
  // totalValue,
});

Header.propTypes = {
  userInfo: string.isRequired,
  expenses: PropTypes.arrayOf(string).isRequired,
  // totalValue: number.isRequired,
};

export default connect(mapStateToProps)(Header);
