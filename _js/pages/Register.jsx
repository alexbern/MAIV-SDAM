'use strict';

import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';
import {login} from '../api/auth';
import {insert} from '../api/users';
import token from '../auth/token';

export default class Register extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      name: '',
      password: '',
      phone: ''
    };
  }

  changeHandler(){
    let {email, name, password, phone} = this.refs;
    this.setState({
      email: email.value,
      name: name.value,
      password: password.value,
      phone: phone.value
    });
  }

  submitHandler(e){
    e.preventDefault();
    let errors = this.validate();
    if (isEmpty(errors)) {
      // //fetch
      insert(this.state)
        .then(()=>login(this.state))
        .then(t=>token.set(t))
        .then(()=> {
          this.context.router.push('/home');
        });
    }else{
      this.setState({errors, password: ''});
    }
  }

  validate(){
    let {email, password, name, phone} = this.state;
    let errors = {};
    if(!email){
      errors.email = 'Ongeldig email adress';
    }

    if(!password){
      errors.password = 'Ongeldig paswoord';
    }

    if(!name){
      errors.name = 'Vul uw naam in';
    }

    if(!phone){
      errors.phone = 'Ongeldig telefoon nummer';
    }

    return errors;
  }

  render() {
    let {name, password, email, phone} = this.state;
    return (
      <form action="" method="post" onSubmit={(e)=>this.submitHandler(e)} acceptCharset="utf-8">
        <fieldset className="register-fieldset">
          <h1>REGISTER</h1>
          <label for="register-name">name:</label><input type="text" ref="name" onChange={()=>this.changeHandler()} id="register-name" name="register-name" value={name} />
          <label for="register-email">email:</label><input type="email" ref="email" onChange={()=>this.changeHandler()} id="register-email" name="register-email" value={email} />
          <label for="register-password">password:</label><input type="password" ref="password" onChange={()=>this.changeHandler()} id="register-password" name="register-password" value={password} />
          <label for="register-phone">phone:</label><input type="text" ref="phone" onChange={()=>this.changeHandler()} id="register-phone" name="register-phone" value={phone} />
        </fieldset>
        <input type="submit" value="register" />
      </form>
    );
  }
}
