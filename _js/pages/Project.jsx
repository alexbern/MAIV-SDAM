'use strict';

import React, {PropTypes} from 'react';
import {getProjectById} from '../api/projects';
import {isEmpty} from 'lodash';
import {addVote, checkVote, deleteVote, countVotes} from '../api/votes';
import {size} from 'lodash';
import token from '../auth/token';

export default class Project extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      project: '',
      votes: ''
    };
  }

  componentWillMount(){
    let {id} = this.props.params;
    getProjectById(id)
      .then(project => {
        this.setState({project: project});
      })
      .then(()=>{
        if (isEmpty(this.state.project)) {
          this.context.router.push('/home');
        }else{
          this.countVotes();
        }
      });
  }

  countVotes(){
    let {project} = this.state;
    if (project) {
      countVotes(project['0'].id)
        .then(votes => {
          let voteCount = size(votes.votes).toString();
          this.setState({votes: voteCount});
        });
    }
  }

  vote(){
    let {project} = this.state;
    if (project) {
      if (!token.content()) {
        return false;
      }else{
        let userid = token.content().user.id;
        let id = project['0'].id;
        checkVote(userid, id)
          .then( votes => {
            if(isEmpty(votes.votes) === false) {
              //verwijderen
              deleteVote(userid, id)
                .then(this.countVotes());
            }
            if (isEmpty(votes.votes) === true) {
              let data = {userid: userid, id: id};
              addVote(data)
                .then(this.countVotes());
            }
          });
      }
    }
  }

  render() {
    let {project, votes} = this.state;
    return (
      <div>
        Likes: {votes}
        <input type='submit' onClick={() => this.vote()} value='vote'/>
      </div>
    );
  }
}
