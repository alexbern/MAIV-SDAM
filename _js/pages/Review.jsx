'use strict';

import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';
import {getRoomById} from '../api/rooms';
import token from '../auth/token';

export default class Review extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      room: '',
      review: ''
    };
  }

  componentWillMount(){
    if (isEmpty(token.content())) {
      this.context.router.push('/home');
    }else{
      let {id} = this.props.params;
      if (isEmpty(id)) {
        this.context.router.push('/home');
      }else{
        //OPHALEN
        getRoomById(id)
          .then(room => this.setState({room: room}));
      }
    }
  }

  compnentDidMount(){

  }

  submitHandler(e){
    e.preventDefault();
  }

  changeHandler(){
    let {review} = this.refs;
    this.setState({
      review: review.value,
      sfeer: ''
    });
  }

  render() {
    return (
      <form action="" onSubmit={(e)=>this.submitHandler(e)} className="login-form">
        <h3>Review</h3>
        <fieldset className="login-fieldset">
          <textarea ref='review' onChange={()=>this.changeHandler()}>
          </textarea>
          Sfeer:
          <select onChange={()=>this.changeHandler()}>
            <option value="1">Niet zo goed</option>
            <option value="2">Redelijk Goed</option>
            <option value="3">Goed</option>
            <option value="4">Heel Goed</option>
            <option value="5">Geweldig</option>
          </select>
        </fieldset>
        <input type="submit" value="login" />
      </form>
    );
  }
}
