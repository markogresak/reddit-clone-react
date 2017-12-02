import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import _ from 'lodash';

import {inputStyle} from '../../style-vars';
import {routeCodes} from '../../routes';
import {hasUserToken} from '../../helpers/token-manager';
import {submitLogin} from '../../actions/auth.action';
import ApiErrors from '../ApiErrors';

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const inputMarginBottom = 12;

const loginInputStyle = {
  ...inputStyle,
  width: '100%',
  marginBottom: inputMarginBottom,
};

class Login extends React.Component {
  onFormSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      username: _.get(e.target, 'username.value'),
      password: _.get(e.target, 'password.value'),
      rememberMe: _.get(e.target, 'rememberMe.checked'),
    };

    this.props.submitLogin(loginData);
  }

  render() {
    const {isLoginLoading, errors} = this.props;

    if (hasUserToken()) {
      return (
        <Redirect to={routeCodes.HOME} />
      );
    }

    return (
      <LoginWrapper>
        <form onSubmit={this.onFormSubmit}>
          <LoginFormContainer>
            <ApiErrors errors={errors} />

            <input style={loginInputStyle} type="text" name="username" />
            <input style={loginInputStyle} type="password" name="password" />

            <span style={{alignSelf: 'left', marginBottom: inputMarginBottom}}>
              <input type="checkbox" name="rememberMe" id="rememberMe" defaultChecked />
              <label htmlFor="rememberMe" style={{marginLeft: 8}}>Remember me</label>
            </span>

            <button type="submit" disabled={isLoginLoading}>
              {isLoginLoading ? 'Logging in...' : 'Login'}
            </button>
          </LoginFormContainer>
        </form>
      </LoginWrapper>
    );
  }
}

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  isLoginLoading: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoginLoading: state.auth.isLoginLoading,
    errors: state.auth.loginErrors,
  };
}

export default connect(mapStateToProps, {submitLogin})(Login);
