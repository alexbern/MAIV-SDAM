'use strict';

import React from 'react';
import {basename} from '../globals';
import {Link} from 'react-router';

export default class Listitem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  renderDesc(){
    let {description} = this.props;
    if (description.length > 70) {
      description = description.substring(0, 69) + "...";
    }
    return description;
  }

  componentDidMount(){
    let {backgroundimg} = this.refs;
    let {image} = this.props;
    backgroundimg.style.backgroundSize = `cover`;
    backgroundimg.style.backgroundImage = `url(${basename}/assets/img/${image})`;
  }

  render() {
    let {name, id} = this.props;
    return (

        <div className="resultaat">
          <Link to={`/room/${id}`}>
            <div className="top" ref='backgroundimg'>
            </div>
            <div className="bottom">
              <p className="item_title">{name}</p>
              <p className="item_beschrijving">{this.renderDesc()}</p>
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
