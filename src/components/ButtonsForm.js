import { bool, func } from 'prop-types';
import React, { Component } from 'react';

export default class ButtonsForm extends Component {
  render() {
    const { isEditingExpense, onSaveExpense, onSaveEditedExpense } = this.props;
    return (
      <div>
        { isEditingExpense
          ? (
            <button
              name="editExpense"
              type="button"
              onClick={ onSaveEditedExpense }
            >
              Editar despesa
            </button>)
          : (
            <button
              name="addExpense"
              type="button"
              onClick={ onSaveExpense }
            >
              Adicionar despesa
            </button>)}
      </div>
    );
  }
}

ButtonsForm.propTypes = {
  onSaveExpense: func.isRequired,
  onSaveEditedExpense: func.isRequired,
  isEditingExpense: bool.isRequired,
};
