'use strict';

import React, {PropTypes} from 'react';
import {getProjects} from '../api/projects';
import {getRooms, searchRooms} from '../api/rooms';
import {addVote, checkVote, deleteVote} from '../api/votes';
import {searchProjects} from '../api/projects';
import {Project} from '../components';
import {isEmpty} from 'lodash';
import Emitter from '../events/';
import token from '../auth/token';

export default class Overview extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      projects: '',
      search: ''
    };

    Emitter.on('vote', content=> this.voteHandler(content));
  }

  voteHandler(id){
    if (!token.content()) {
      return false;
    }else{
      let userid = token.content().user.id;
      checkVote(userid, id)
        .then( votes => {
          if (isEmpty(votes.votes) === false) {
            deleteVote(userid, id)
              .then(Emitter.emit('reload'));
          }
          if (isEmpty(votes.votes) === true) {
            let data = {userid: userid, id: id};
            addVote(data)
              .then(Emitter.emit('reload'));
          }
        });

    }
  }

  changeHandler(){
    let {search} = this.refs;
    this.setState({search: search.value});
  }

  submitHandler(e){
    e.preventDefault();
    let {search} = this.state;
    if (search === '') {
      return;
    }else{
      if (window.location.search === '?type=rooms') {
        //zoek kamers
        searchRooms(this.state.search)
          .then(projects => this.setState({projects: projects}));
      }
      if (window.location.search === '?type=projects') {
        //zoekprojecten
        searchProjects(this.state.search)
          .then(projects => this.setState({projects: projects}));
      }
    }
  }

  componentWillMount(){
    if (window.location.search === '') {
      this.context.router.push('/home');
    }
    if(window.location.search === '?type=rooms' || window.location.search === '?type=projects'){
      if (window.location.search === '?type=rooms') {
        getRooms()
          .then(rooms => this.setState({projects: rooms}));
      }
      if (window.location.search === '?type=projects') {
        getProjects()
          .then(projects => this.setState({projects: projects}));
      }
    }else{
      this.context.router.push('/home');
      return;
    }
  }

  renderItems(){
    if (window.location.search === '?type=rooms') {
      console.log('render rooms');
    }

    if (window.location.search === '?type=projects') {
      let {projects} = this.state;
      if (projects) {
        return projects.projects.map((project, i)=>{
          return <Project {...project} key={i}/>;
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div>Dit is de overview</div>
        {this.renderItems()}
        <form className='search-form' action='#' onSubmit={(e)=>this.submitHandler(e)}>
          <input type='text' className='search-input' onChange={()=>this.changeHandler()} ref="search" name='search' placeholder='Naar wat voor woning ben je op zoek?'/><button className='search-submit'>zoeken</button>
        </form>
      </div>
    );
  }
}
