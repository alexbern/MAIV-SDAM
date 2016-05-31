'use strict';

import React from 'react';
import {basename} from '../globals';

export default class Listitem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <li className='listItem'>
        <img src={`${basename}/assets/img/temp.png`} className='listItemImage'/>
        <article className='listItemInfo'>
          <h3>Lorem ipsum</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </article>
      </li>
    );
  }
}
