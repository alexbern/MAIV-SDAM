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
    return (
      <form action="" onSubmit={(e)=>this.submitHandler(e)} className="login-form">
        <h3>Login</h3>
        <fieldset className="login-fieldset">
          <label for="login-email">email:</label><input type="email" id="login-email" onChange={()=>this.changeHandler()} className="login-input" ref="email" name="login-email" />
          <label for="login-password">password:</label><input type="password" id="login-password" onChange={()=>this.changeHandler()} className="login-input" ref="password" name="login-password" />
        </fieldset>
        <div className="error-alert">{error}</div>
        <input type="submit" value="login" />
      </form>
    );
  }
}
