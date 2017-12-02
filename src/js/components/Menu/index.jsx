import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {routeCodes} from '../../routes';
import urlFromTemplate from '../../helpers/url-from-template';
import {getUserToken} from '../../helpers/token-manager';

import {
  menuBackground,
} from '../../style-vars';

const MenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 6px 16px;
  background: ${menuBackground};
`;

function Menu({pathname}) {
  if (pathname === routeCodes.LOGIN) {
    return null;
  }

  const {
    userId,
    username,
  } = (getUserToken() || {});

  return (
    <MenuWrapper>
      <span style={{marginRight: 'auto'}}>
        <Link to={routeCodes.HOME}>Home</Link>
      </span>

      {
        (userId && username) ? (
          <span>
            <span style={{marginRight: 8}}>
              Logged in as <Link to={urlFromTemplate(routeCodes.USER, {id: userId})}>{username}</Link>.
            </span>
            <Link to={routeCodes.LOGOUT}>Logout</Link>
          </span>
        ) : (
          <span>
            <Link to={routeCodes.LOGIN}>Login</Link>
          </span>
        )
      }
    </MenuWrapper>
  );
}

Menu.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
  };
}

export default connect(mapStateToProps)(Menu);
