'use strict';

import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';
import {getRoomById} from '../api/rooms';
import {insertReview} from '../api/review';
import token from '../auth/token';

export default class Review extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      roomId: '',
      userId: '',
      room: '',
      review: '',
      sfeer: '',
      checkin: '',
      beauty: '',
      interior: '',
      accomo: '',
      value: ''
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
          .then(room => this.setState({room: room}))
          .then(this.setState({userId: token.content().user.id, roomId: parseInt(id)}))
          .then(()=>{
            let {room} = this.state;
            if (room.room === false) {
              this.context.router.push('/home');
            }
          });
      }
    }
  }

  submitHandler(e){
    e.preventDefault();
    let error = this.validate();
    if (isEmpty(error)) {
      insertReview(this.state)
        .then(this.context.router.push('/home'));
    }else{
      console.error(error);
      return;
    }
  }

  validate(){
    let {review, beauty, interior, accomo, sfeer, checkin, value} = this.state;
    let error = {};
    if(!review){
      error.review = 'geen review meegegeven';
    }
    if(!sfeer){
      error.sfeer = 'geen rating voor de sfeer';
    }
    if(!beauty){
      error.beauty = 'geen rating voor de beauty';
    }
    if(!accomo){
      error.accomo = 'geen rating voor de accomo';
    }
    if(!interior){
      error.interior = 'geen rating voor de interior';
    }
    if(!value){
      error.value = 'geen rating voor de waarde';
    }
    if(!checkin){
      error.checkin = 'geen rating voor de checkin';
    }
    return error;
  }


  changeHandler(){
    let {review} = this.refs;
    this.setState({
      review: review.value
    });
  }

  clickHandler(e){
    e.preventDefault();
    let star = e.currentTarget;
    if (star.className === 'sfeer') {
      this.setState({sfeer: star.value});
    }
    if (star.className === 'checkin') {
      this.setState({checkin: star.value});
    }
    if (star.className === 'beauty') {
      this.setState({beauty: star.value});
    }
    if (star.className === 'interior') {
      this.setState({interior: star.value});
    }
    if (star.className === 'accomo') {
      this.setState({accomo: star.value});
    }
    if (star.className === 'value') {
      this.setState({value: star.value});
    }
  }

  renderStars(type){
    let stars = [];
    for (var i = 0; i < 5; i++) {
      let star = <li className={type} key={i + 1}id={i + 1} value={i + 1} onClick={(e)=>this.clickHandler(e)}>{i + 1}</li>;
      stars.push(star);
    }
    return stars;
  }

  render() {
    console.log(this.state);
    return (
      <form action="" onSubmit={(e)=>this.submitHandler(e)} className="login-form">
        <h3>Review</h3>
        <fieldset className="login-fieldset">
          <textarea ref='review' onChange={()=>this.changeHandler()}>
          </textarea>
          {/*<select onChange={()=>this.changeHandler()} ref='sfeer'>
            <option value="">Kies iets</option>
            <option value="1">Niet zo goed</option>
            <option value="2">Redelijk Goed</option>
            <option value="3">Goed</option>
            <option value="4">Heel Goed</option>
            <option value="5">Geweldig</option>
          </select>*/}
          <ul>
            Sfeer:
            {this.renderStars('sfeer')}
          </ul>
          <ul>
            Schoonheid:
            {this.renderStars('beauty')}
          </ul>
          <ul>
            Accomodatie:
            {this.renderStars('accomo')}
          </ul>
          <ul>
            Interieur:
            {this.renderStars('interior')}
          </ul>
          <ul>
            Waarde:
            {this.renderStars('value')}
          </ul>
          <ul>
            Check-in:
            {this.renderStars('checkin')}
          </ul>

        </fieldset>
        <input type="submit" value="login" />
      </form>
    );
  }
}
