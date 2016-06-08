'use strict';

import React from 'react';
import {basename} from '../globals';
import {Link} from 'react-router';

export default class Listitem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    console.log(this.props);
  }

  render() {
    let {name, id, description} = this.props;
    return (
      <Link to={`/project/${id}`}>
        <div className="resultaat">
          <div className="top">
            <img src={`${basename}/#`}/>
          </div>
          <div className="bottom">
            <p className="item_title">{name}</p>
            <p className="item_beschrijving">{description}</p>
            <div className="cta">
              <a href="#">Toon me meer</a>
              <img src="#" />
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
