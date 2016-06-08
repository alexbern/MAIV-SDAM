'use strict';

import React from 'react';

export default () => {

  return (
    <div className="navigatie not_sticky">
      <div className="container">
        <a href="index.html" className="logo">hoogtel</a>
        <nav>
          <ul>
            <li><a href="verblijven.html">onze verblijven</a></li>
            <li><a href="projecten.html">ingezonden projecten</a></li>
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
