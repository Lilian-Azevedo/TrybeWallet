import PropTypes, { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, addEditedExpense, thunkWallet, changeKeyEdit } from '../actions';
import ButtonsForm from './ButtonsForm';
import SelectCompForm from './SelectCompForm';

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
      const { value, description } = this.state;
      const { isEditingExpense, hasClickedEdit,
        expenseForEdit, changedLocalState } = this.props;

      if (hasClickedEdit) {
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
          <SelectCompForm handleInput={ this.handleInput } />
          
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
            isEditingExpense={ isEditingExpense }
          />
        </form>
      );
    }
}

const mapStateToProps = ({ wallet }) => ({
  exchange: wallet.exchange,
  isEditingExpense: wallet.isEditingExpense,
  expenseForEdit: wallet.expenseForEdit,
  hasClickedEdit: wallet.hasClickedEdit,
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
  exchange: PropTypes.objectOf(PropTypes.objectOf(string)).isRequired,
  isEditingExpense: bool.isRequired,
  expenseForEdit: PropTypes.objectOf(PropTypes.objectOf(string)).isRequired,
  hasClickedEdit: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
