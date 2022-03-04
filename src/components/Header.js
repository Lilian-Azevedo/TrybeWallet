import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  state = {
    expenses: 0,
  }

  render() {
    const { user } = this.props;
    const { expenses } = this.state;

    return (
      <header data-testid="header-component" className="header">
        <h2>TrybeWallet</h2>
        <div>
          <h4 data-testid="email-field">{ user }</h4>
          <h4 data-testid="total-field">{expenses}</h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </div>
      </header>);
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  user: email });

Header.propTypes = {
  user: string.isRequired,
};

export default connect(mapStateToProps)(Header);
