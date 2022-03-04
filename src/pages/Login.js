import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import { saveUser } from '../actions';

class Login extends Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    disabled: true,
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState(
      { [name]: value },
      () => this.setState({ disabled: this.verifyValidation() }),
    );
  }

  verifyValidation = () => {
    const MIN_LETTERS = 6;
    const { inputEmail, inputPassword } = this.state;
    return !(inputPassword.length >= MIN_LETTERS
      && inputEmail.includes('@')
      && inputEmail.includes('.com'));
  }

  handleClick = () => {
    const { history, login } = this.props;
    const { inputEmail } = this.state;
    login(inputEmail);
    history.push('/carteira');
  }

  handleEnterClick = (event) => {
    if (event.key === 'Enter') return this.handleClick();
  }

  render() {
    const { inputEmail, inputPassword, disabled } = this.state;

    return (
      <div className="page-login">
        <div className="area-login">
          <h1>TrybeWallet</h1>
          <input
          /*    autoComplete="off" */
            type="text"
            onChange={ this.handleInput }
            onKeyDown={ this.handleEnterClick }
            value={ inputEmail }
            name="inputEmail"
            data-testid="email-input"
            placeholder="Email"
          />
          <input
            autoComplete="off"
            type="password"
            onChange={ this.handleInput }
            onKeyDown={ this.handleEnterClick }
            value={ inputPassword }
            name="inputPassword"
            data-testid="password-input"
            placeholder="Senha"
          />
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="login-submit-button"
            disabled={ disabled }
          >
            Entrar
          </button>
        </div>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(saveUser(payload)),
});

Login.propTypes = {
  history: string.isRequired,
  login: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
