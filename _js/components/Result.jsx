'use strict';

import React from 'react';
import {Link} from 'react-router';
import {basename} from '../globals/';

export default class Result extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount(){
    let {image} = this.props;
    let {foto} = this.refs;
    foto.style.backgroundSize = 'cover';
    foto.style.backgroundImage = `url('${basename}/assets/img/${image}')`;
  }

  render() {
    let {id, name, description} = this.props;
    return (
      <div className="resultaat">
        <Link to={`/room/${id}`}>
        <div className="top" ref='foto'>
        </div>
        <div className="bottom">
          <p className="item_title">{name}</p>
        <p>{description}</p>
          <div className="cta">
            <a href="#">Toon me meer</a>
            <img src={`${basename}/assets/img/arrow.svg`} />
          </div>
        </div>
        </Link>
      </div>
    );
  }
}
