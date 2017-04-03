import React from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from '../../routes';

function Menu() {
  return (
    <div className="Menu">
      <Link to={routeCodes.DASHBOARD}>
        Dashboard
      </Link>
      <Link to={routeCodes.ABOUT}>
        About
      </Link>
      <Link to="404">
        404
      </Link>
    </div>
  );
}

export default Menu;
