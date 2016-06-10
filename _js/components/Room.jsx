'use strict';

import React from 'react';
import {Link} from 'react-router';
import {basename} from '../globals/';

export default class Room extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount(){
    let {backgroundimg} = this.refs;
    let {image} = this.props;
    backgroundimg.style.backgroundSize = `cover`;
    backgroundimg.style.backgroundImage = `url(${basename}/assets/img/${image})`;
  }

  render() {
    let {name, description, id} = this.props;
    return (
        <div className="resultaat">
          <Link className="resultaat_link" to={`/room/${id}`}>
            <div className="top" ref='backgroundimg'>
            </div>
            <div className="bottom">
              <p className="item_title">{name}</p>
              <p className="item_beschrijving">{description}</p>
              <div className="cta meer">
                <Link to=''>Toon me meer</Link>
                <img src={`${basename}/assets/img/arrow.svg`} />
              </div>
            </div>
          </Link>
        </div>
    );
  }
}
