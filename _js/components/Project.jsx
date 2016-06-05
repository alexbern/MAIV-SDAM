'use strict';

import React from 'react';
import {countVotes} from '../api/votes';
import Emitter from '../events/';
import {size} from 'lodash';

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

  vote(){
    let {id} = this.props;
    Emitter.emit('vote', id);
  }

  render() {
    console.log(this.state);
    let {name} = this.props;
    let {votes} = this.state;
    return (
      <div>{name}
        <input type='submit' onClick={() => this.vote()} value='vote'/>
        votes: {votes}
      </div>
    );
  }
}
