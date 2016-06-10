'use strict';

import React from 'react';
import {countVotes} from '../api/votes';
import Emitter from '../events/';
import {size} from 'lodash';
import {Link} from 'react-router';
import {basename} from '../globals/';

export default class Project extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      votes: ''
    };

    Emitter.on('reload', ()=> this.countVotes());
  }

  countVotes(){
    countVotes(this.props.id)
      .then(votes => {
        let voteCount = size(votes.votes).toString();
        this.setState({votes: voteCount});
      });
  }

  componentWillMount(){
    this.countVotes();
  }

  componentDidMount(){
    let {backgroundimg} = this.refs;
    let {img1, owner_id, id} = this.props;
    backgroundimg.style.backgroundSize = `cover`;
    backgroundimg.style.backgroundImage = `url(${basename}/uploads/${owner_id}/projects/${id}/imageone/${img1})`;
  }

  vote(){
    let {id} = this.props;
    Emitter.emit('vote', id);
  }

  render() {
    let {shortdesc, name, id} = this.props;
    return (
      <div className="resultaat">
        <Link className="resultaat_link" to={`/project/${id}`}>
          <div className="top" ref='backgroundimg'>
          </div>
          <div className="bottom">
            <p className="item_title">{name}</p>
            <p className="item_beschrijving">{shortdesc}</p>
            <div className="cta meer">
              <a href="#">Toon me meer</a>
              <img src={`${basename}/assets/img/arrow.svg`} />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
