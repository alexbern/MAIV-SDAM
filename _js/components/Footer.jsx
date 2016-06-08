'use strict';

import React from 'react';
import token from '../auth/token';
import {insert} from '../api/newsletters';
import {isEmpty} from 'lodash';

export default class Footer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      name: ''
    };
  }

  componentWillMount(){
    if (token.content() && token.content().user.email) {
      this.setState({email: token.content().user.email});
    }
    if (token.content() && token.content().user.name) {
      this.setState({name: token.content().user.name});
    }
  }

  changeHandler(){
    let {letter, email} = this.refs;
    this.setState({
      name: letter.value,
      email: email.value
    });
  }

  submitHandler(e){
    e.preventDefault();
    let {email, name} = this.state;
    if (isEmpty(email) || isEmpty(name)) {
      return;
    }else{
      insert(this.state);
    }
  }

  render() {

    let {email, name} = this.state;

    return (
      <footer>
        <div className="container">
          <div className="contact">
            <p className="footer_title">CONTACT</p>
            <ul>
              <li><a href="mailto:hallo@jonasleupe.be">hallo@jonasleupe.be</a></li>
              <li><a href="tel:0032495195774">+32 495 19 57 74</a></li>
            </ul>
          </div>
          <div className="adres">
            <p className="footer_title">adres</p>
            <a href="#">Hoogstraat 1<br/>3111 Schiedam, Nederland</a>
          </div>
          <div className="nieuwsbrief">
            <p className="footer_title">nieuwsbrief</p>
            <input type="text" placeholder="Naam" value={name} ref='letter' onChange={() => this.changeHandler()} />
            <input type="email" placeholder="E-mail adres" value={email} ref='email' onChange={() => this.changeHandler()} />
            <button type="submit" onClick={(e) => this.submitHandler(e)}>inschrijven</button>
          </div>
          <div className="social">
            <p className="footer_title">sociaal</p>
            <ul>
              <li><a href="http://www.facebook.com/">Facebook</a></li>
              <li><a href="http://www.instagram.com/">Instagram</a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}
