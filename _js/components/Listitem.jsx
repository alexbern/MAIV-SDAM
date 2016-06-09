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

  componentDidMount(){
    let {backgroundimg} = this.refs;
    let {image} = this.props;
    backgroundimg.style.backgroundSize = `cover`;
    backgroundimg.style.backgroundImage = `url(${basename}/assets/img/${image})`;
  }

  render() {
    let {name, id, description} = this.props;
    return (

        <div className="resultaat">
          <Link to={`/room/${id}`}>
            <div className="top" ref='backgroundimg'>
              {/*<img src={`${basename}/assets/img/${image}`}/>*/}
            </div>
            <div className="bottom">
              <p className="item_title">{name}</p>
              <p className="item_beschrijving">{description}</p>
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
