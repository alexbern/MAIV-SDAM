'use strict';

import React from 'react';
import {Link} from 'react-router';

export default () => {

  return (
    <div className="navigatie not_sticky">
      <div className="container">
        <Link to={`/home`} className="logo">hoogtel</Link>
        <nav>
          <ul>
            <li><Link to={`/rooms`}>onze verblijven</Link></li>
            <li><Link to={`/projects`}>ingezonden projecten</Link></li>
          </ul>
        </nav>
        <div className="boek_btn">
          <Link to={`/submit`}>deelnemen</Link>
        </div>
      </div>
    </div>
    );
};
