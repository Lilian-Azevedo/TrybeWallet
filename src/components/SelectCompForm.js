import PropTypes, { func, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectCompForm extends Component {
  render() {
    const methodsList = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { handleInput, currencies, currency, method, tag } = this.props;
    return (
      <>
        <label htmlFor="currency">
          Moeda
        </label>
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ handleInput }
          >
            { currencies.map((item) => (
              <option key={ item } data-testid={ item } value={ item }>{item}</option>
            ))}
          </select>

        <label htmlFor="method">
          Método de pagamento
        </label>
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ handleInput }
          >
            { methodsList.map((methodItem) => (
              <option key={ methodItem } value={ methodItem }>{methodItem}</option>
            ))}
          </select>

        <label htmlFor="tag">
          Categoria
        </label>
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ handleInput }
          >
            { tagList.map((tagItem) => (
              <option key={ tagItem } value={ tagItem }>{tagItem}</option>
            ))}
          </select>
      </>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

SelectCompForm.propTypes = {
  handleInput: func.isRequired,
  currencies: PropTypes.arrayOf(string).isRequired,
  currency: string.isRequired,
  method: string.isRequired,
  tag: string.isRequired,
};

export default connect(mapStateToProps)(SelectCompForm);
