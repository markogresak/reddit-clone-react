import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash';

import { dangerColor, successColor } from '../../style-vars';
import { routeCodes } from '../../routes';
import { hasUserToken } from '../../helpers/token-manager';
import { submitLogin } from '../../actions/auth.action';
import ApiErrors from '../ApiErrors';
import { menuHeight } from '../Menu';

export const LoginWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - ${menuHeight}px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 220px;
`;

export const inputMarginBottom = 12;

export const LoginInput = styled.input`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  margin-bottom: ${inputMarginBottom}px;
  ${props =>
    props.error &&
    css`
      color: ${dangerColor};
    `};
`;

export const LoginLabel = styled.label`
  align-self: left;
  margin-bottom: ${inputMarginBottom / 2}px;
  margin-left: -8px;
  ${props =>
    props.error &&
    css`
      color: ${dangerColor};
    `};
`;

const CheckboxWrapper = LoginLabel.extend`
  margin-bottom: ${inputMarginBottom}px;
`;

export const FormError = styled.small`
  width: 200px;
  color: ${dangerColor};
  margin-top: -${inputMarginBottom / 2}px;
  margin-bottom: ${inputMarginBottom}px;
`;

const FormSuccess = styled.strong`
  margin: 16px 0;
  color: ${successColor};
`;

class Login extends React.Component {
  onFormSubmit = e => {
    e.preventDefault();

    const loginData = {
      username: _.get(e.target, 'username.value'),
      password: _.get(e.target, 'password.value'),
      rememberMe: _.get(e.target, 'rememberMe.checked'),
    };

    this.props.submitLogin(loginData);
  };

  render() {
    const { isLoginLoading, errors, location: { state: registerSuccess } } = this.props;

    if (hasUserToken()) {
      return <Redirect to={routeCodes.HOME} />;
    }

    return (
      <LoginWrapper>
        <form onSubmit={this.onFormSubmit}>
          <LoginFormContainer>
            <ApiErrors errors={errors} />

            {registerSuccess && (
              <FormSuccess>
                The registration was successful. You can now login with the chosen username and password.
              </FormSuccess>
            )}

            <LoginLabel htmlFor="username">Username</LoginLabel>
            <LoginInput type="text" name="username" required />
            <LoginLabel htmlFor="password">Password</LoginLabel>
            <LoginInput type="password" name="password" required />

            <CheckboxWrapper>
              <input type="checkbox" name="rememberMe" id="rememberMe" defaultChecked />
              <label htmlFor="rememberMe" style={{ marginLeft: 8 }}>
                Remember me
              </label>
            </CheckboxWrapper>

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
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    isLoginLoading: state.auth.isLoginLoading,
    errors: state.auth.loginErrors,
  };
}

export default connect(mapStateToProps, { submitLogin })(Login);
