import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { func, string } from 'prop-types';
import { removeExpense } from '../actions';
import '../styles/header.css';

class WalletExpensesSaved extends Component {
  render() {
    const { expenses, expenseForRemove } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ id, value, currency, method, tag, description, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                {/* { exchangeRates[currency].ask.includes('.')
                        ? <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                        : <td>{exchangeRates[currency].ask}.00</td>
                        } */}
                <td>
                  {(Number(exchangeRates[currency].ask)
                    * Number(value)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    id={ id }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => expenseForRemove(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expenseForRemove: (id) => dispatch(removeExpense(id)),
});

WalletExpensesSaved.propTypes = {
  expenses: PropTypes.arrayOf(string).isRequired,
  expenseForRemove: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpensesSaved);
