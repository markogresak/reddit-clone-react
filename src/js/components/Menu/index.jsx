import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {routeCodes} from '../../routes';
import urlFromTemplate from '../../helpers/url-from-template';
import {getUserToken} from '../../helpers/token-manager';

import {
  defaultBorderColor,
} from '../../style-vars';

export const menuHeight = 40;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 16px;
  border-bottom: 1px solid ${defaultBorderColor};
  height: ${menuHeight}px;
  box-sizing: border-box;
`;

function Menu() {
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
          <div>
            <span key="register" style={{marginRight: 16}}>
              <Link to={routeCodes.REGISTER}>Register</Link>
            </span>
            <span key="login">
              <Link to={routeCodes.LOGIN}>Login</Link>
            </span>
          </div>
        )
      }
    </MenuWrapper>
  );
}

export default Menu;
