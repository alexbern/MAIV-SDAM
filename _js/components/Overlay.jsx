'use strict';

import React from 'react';
import {Link} from 'react-router';
export default () => {

  return (
    <div className="overlay_menu hide">
     <nav>
      <ul>
        <li>
          <Link to="/rooms">Kamers</Link>
        </li>
        <li>
          <Link to="/projects">Projecten</Link>
        </li>
      </ul>
     </nav>

    </div>
    );
};
