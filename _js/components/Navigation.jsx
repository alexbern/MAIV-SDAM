'use strict';

import React from 'react';

export default class Navigation extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <nav className='navigation'>
        <ul className='navigation-wrapper-list'>
          <li className='hoogtel'>hoogtel</li>
          <div className='navigation-options'>
            <li>Plan je bezoek</li>
            <li>Word ambassadeur</li>
            <li>Onze kamers</li>
          </div>
          <li className='login'>Aanmelden</li>
        </ul>
      </nav>
    );
  }
}
