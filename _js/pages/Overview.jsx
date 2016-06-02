'use strict';

import React, {PropTypes} from 'react';
import {getProjects} from '../api/projects';

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
    getProjects()
      .then(projects => this.setState({projects: projects}));
  }

  render() {
    console.log(this.state);
    return (
      <div>Dit is detail</div>
    );
  }
}
