import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { func, string } from 'prop-types';
import { removeExpense, editExpense } from '../actions';
import '../styles/header.css';

class WalletExpensesSaved extends Component {
  render() {
    const { expenses, expenseForRemove, expenseForEdit } = this.props;

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
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(exchangeRates[currency].ask)
                    * Number(value)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    id={ id }
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => expenseForEdit(id) }
                  >
                    Editar
                  </button>
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

// fonte tabela: https://edrodrigues.com.br/blog/criando-tabelas-com-filtros-%E2%80%8B%E2%80%8Busando-react/

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expenseForRemove: (id) => dispatch(removeExpense(id)),
  expenseForEdit: (id) => dispatch(editExpense(id)),
});

WalletExpensesSaved.propTypes = {
  expenses: PropTypes.arrayOf(string).isRequired,
  expenseForRemove: func.isRequired,
  expenseForEdit: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpensesSaved);
