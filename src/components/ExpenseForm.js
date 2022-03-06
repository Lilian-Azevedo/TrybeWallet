import PropTypes, { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, addEditedExpense, thunkWallet, changeKeyEdit } from '../actions';
import ButtonsForm from './ButtonsForm';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class ExpenseForm extends Component {
    state = {
      id: 0,
      ...INITIAL_STATE,
    }

    componentDidMount() {
      const { getCurrencies } = this.props;
      getCurrencies();
    }

    handleInput = ({ target: { name, value } }) => {
      this.setState(
        { [name]: value },
      );
    }

    onSaveExpense = () => {
      const { expenseInfo, getCurrencies, exchange } = this.props;
      getCurrencies();
      expenseInfo({ ...this.state, exchangeRates: { ...exchange } });
      this.setState((prevState) => ({ id: prevState.id + 1, ...INITIAL_STATE }));
    }

    onSaveEditedExpense = () => {
      const { expenseForEdit, expenseEdited } = this.props;
      const { id, ...expenseDataUp } = this.state;
      expenseEdited({ ...expenseDataUp,
        id: expenseForEdit.id,
        exchangeRates: expenseForEdit.exchangeRates });
      this.setState({ ...INITIAL_STATE });
    }

    render() {
      const { value, currency, method, tag, description } = this.state;
      const { currencies, updateExpenseEdited, editItemState,
        expenseForEdit, changedLocalState } = this.props;

      if (editItemState) {
        this.setState({
          value: expenseForEdit.value,
          currency: expenseForEdit.currency,
          method: expenseForEdit.method,
          tag: expenseForEdit.tag,
          description: expenseForEdit.description });
        changedLocalState();
      }

      return (
        <form className="expense-form">
          <label htmlFor="value">
            Valor
            <input
            /* autoComplete="off" */
              name="value"
              type="text"
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ this.handleInput }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleInput }
            >
              { currencies.map((item) => (
                <option key={ item } data-testid={ item } value={ item }>{item}</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleInput }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição
            <textarea
              name="description"
              data-testid="description-input"
              id="description"
              value={ description }
              onChange={ this.handleInput }
            /* autoComplete="off" */
            />
          </label>

          <ButtonsForm
            onSaveExpense={ this.onSaveExpense }
            onSaveEditedExpense={ this.onSaveEditedExpense }
            updateExpenseEdited={ updateExpenseEdited }
          />
        </form>
      );
    }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  exchange: wallet.exchange,
  updateExpenseEdited: wallet.updateExpenseEdited,
  expenseForEdit: wallet.expenseForEdit,
  editItemState: wallet.editItemState,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(thunkWallet()),
  expenseInfo: (expense) => dispatch(addExpense(expense)),
  expenseEdited: (expense) => dispatch(addEditedExpense(expense)),
  changedLocalState: () => dispatch(changeKeyEdit()),
});

ExpenseForm.propTypes = {
  getCurrencies: func.isRequired,
  expenseInfo: func.isRequired,
  expenseEdited: func.isRequired,
  changedLocalState: func.isRequired,
  currencies: PropTypes.arrayOf(string).isRequired,
  exchange: PropTypes.objectOf(PropTypes.objectOf(string)).isRequired,
  updateExpenseEdited: bool.isRequired,
  expenseForEdit: PropTypes.objectOf(PropTypes.objectOf(string)).isRequired,
  editItemState: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
