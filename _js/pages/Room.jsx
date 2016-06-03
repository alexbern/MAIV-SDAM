'use strict';

import React, {PropTypes} from 'react';
import {getRoomById} from '../api/rooms';
import {isEmpty} from 'lodash';

export default class Room extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentWillMount(){
    let {id} = this.props.params;
    getRoomById(id)
      .then(project => {
        this.setState({project: project});
      })
      .then(()=>{
        if (isEmpty(this.state.project.room)) {
          this.context.router.push('/home');
        }
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>Room Overview</div>
    );
  }
}
