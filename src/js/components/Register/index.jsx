import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {routeCodes} from '../../routes';
import {hasUserToken} from '../../helpers/token-manager';
import {submitRegister} from '../../actions/auth.action';
import ApiErrors from '../ApiErrors';
import {
  LoginWrapper,
  LoginFormContainer,
  LoginLabel,
  LoginInput,
  FormError,
} from '../Login';

class Register extends React.Component {
  state = {
    passwordConfirmationError: false,
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({passwordConfirmationError: false});

    const password = _.get(e.target, 'password.value');
    const passwordConfirmation = _.get(e.target, 'password_confirmation.value');

    if (password !== passwordConfirmation) {
      this.setState({passwordConfirmationError: true});
      return false;
    }

    const newUserData = {
      username: _.get(e.target, 'username.value'),
      password,
    };

    this.props.submitRegister(newUserData);
    return true;
  }

  render() {
    const {isRegisterLoading, errors, registerSuccess} = this.props;
    const {passwordConfirmationError: error} = this.state;

    if (hasUserToken()) {
      return (
        <Redirect to={routeCodes.HOME} />
      );
    }

    if (registerSuccess) {
      return (
        <Redirect to={{pathname: routeCodes.LOGIN, state: {registerSuccess}}} />
      );
    }

    return (
      <LoginWrapper>
        <form onSubmit={this.onFormSubmit}>
          <LoginFormContainer>
            {!error &&
              <ApiErrors errors={errors} />
            }

            <LoginLabel htmlFor="username">Username</LoginLabel>
            <LoginInput type="text" name="username" required />

            <LoginLabel htmlFor="password">Password</LoginLabel>
            <LoginInput type="password" name="password" required />

            <LoginLabel htmlFor="password_confirmation" error={error}>Password confirmation</LoginLabel>
            <LoginInput type="password" name="password_confirmation" required error={error} />
            {error &&
              <FormError>Password confirmation must match the value for Password.</FormError>
            }

            <button type="submit" disabled={isRegisterLoading}>
              {isRegisterLoading ? 'Registering new user...' : 'Register'}
            </button>
          </LoginFormContainer>
        </form>
      </LoginWrapper>
    );
  }
}

Register.propTypes = {
  submitRegister: PropTypes.func.isRequired,
  isRegisterLoading: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  registerSuccess: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isRegisterLoading: state.auth.isRegisterLoading,
    errors: state.auth.registerErrors,
    registerSuccess: state.auth.registerSuccess,
  };
}

export default connect(mapStateToProps, {submitRegister})(Register);
