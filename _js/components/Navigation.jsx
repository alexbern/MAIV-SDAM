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
            <li><Link to={`/overview?type=rooms`}>onze verblijven</Link></li>
            <li><Link to={`/overview?type=projects`}>ingezonden projecten</Link></li>
            {/*<!--<li><a href="over.html">over hoogtel</a></li>-->*/}
          </ul>
        </nav>
        <div className="boek_btn">
          <a href="#">boeken</a>
        </div>
      </div>
    </div>
    );
};
