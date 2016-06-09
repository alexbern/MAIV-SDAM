'use strict';

import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';
import {login} from '../api/auth';
import token from '../auth/token';

export default class Login extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  submitHandler(e){
    e.preventDefault();

    let error = this.validate();

    if (isEmpty(error)){
      login(this.state)
        .then(t=>token.set(t))
        .then(()=> {
          this.context.router.push('/home');
        })
        .catch((errors)=>{
          this.setState({error: errors.error, password: '', email: ''});
        });
    }else{
      this.setState({error, password: '', email: ''});
    }
  }

  changeHandler(){
    let {email, password} = this.refs;
    this.setState({
      email: email.value,
      password: password.value
    });
  }

  validate(){
    let {email, password} = this.state;
    let error = '';
    if(!email || !password){
      error = 'Ongeldig email of paswoord';
    }
    return error;
  }

  render() {
    let {error} = this.state;
    console.log(this.state);
    return (
        <main className='aanmelden'>
          <div className="navigatie">
            <div className="container">
              <a href="index.html" className="logo">hoogtel</a>
            </div>
          </div>
          <div className="formulier">
            <h1 className="inner_page_title">Aanmelden</h1>
            <form onSubmit={(e)=>this.submitHandler(e)} action=''>
              <div className="form_item">
                <label for="email">email</label>
                <input type="email" id="email" placeholder="Wat is je e-mail adres?" onChange={()=>this.changeHandler()} ref='email'/>
              </div>
              <div className="form_item">
                <label for="password">wachtwoord</label>
                <input type="password" id="password" placeholder="Wat is je wachtwoord?" onChange={()=>this.changeHandler()} ref='password'/>
              </div>
              {error}
              <input type="submit" value="Inloggen" />
            </form>
          </div>
          <div className="afbeelding">
            <img className="lachende_vrouw" src="assets/img/lachende_vrouw.png" />
          </div>
          <div className="page_title">
            <h1>Aanmelden</h1>
          </div>
        </main>
    );
  }
}
