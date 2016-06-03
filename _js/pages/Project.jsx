'use strict';

import React, {PropTypes} from 'react';
import {getProjectById} from '../api/projects';
import {isEmpty} from 'lodash';

export default class Project extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      project: ''
    };
  }

  componentWillMount(){
    let {id} = this.props.params;
    getProjectById(id)
      .then(project => {
        this.setState({project: project});
      })
      .then(()=>{
        if (isEmpty(this.state.project.project)) {
          this.context.router.push('/home');
        }
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>Project Page</div>
    );
  }
}
