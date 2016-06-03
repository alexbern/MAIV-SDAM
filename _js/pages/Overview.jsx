'use strict';

import React, {PropTypes} from 'react';
import {getProjects} from '../api/projects';
import {getRooms} from '../api/rooms';

export default class Overview extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      projects: ''
    };
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
    }
  }

  componentDidMount(){

  }

  render() {
    console.log(this.state);
    return (
      <div>Dit is de overview</div>
    );
  }
}
