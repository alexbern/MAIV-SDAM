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
      phone: '',
      image: '',
      errors: ''
    };
  }

  onFileChangeHandler(e){
    this.setState({image: e.currentTarget.files[0]});
    console.log(e.currentTarget.files[0]);
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
    console.log(this.state);
    let errors = this.validate();
    if (isEmpty(errors)) {
      insert(this.state)
        .then(()=>login(this.state))
        .then(t=>token.set(t))
        .then(()=> {
          this.context.router.push('/home');
        })
        .catch((error)=>{
          this.setState({errors: {email: error.error}, password: ''});
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
    console.log(this.state);
    let {name, password, email, phone, errors} = this.state;
    return (
        <main className='registreren'>
          <div className="navigatie">
            <div className="container">
              <a href="index.html" className="logo">hoogtel</a>
            </div>
          </div>
          <div className="formulier">
            <h1 className="inner_page_title">Registreren</h1>
            <form method="post" onSubmit={(e)=>this.submitHandler(e)} acceptCharset="utf-8" enctype="multipart/form-data">
              <div className="form_item">
                <input type="hidden" name="MAX_FILE_SIZE" value="2000000" />
                <label for="image" name="image" for="image">selecteer een afbeelding
                <input type="file" id="image" accept="image/*" ref="file" onChange={(e)=>this.onFileChangeHandler(e)}/></label>
              </div>
              <div className="form_item">
                <label for="naam">naam</label>
                <input type="text" id="naam" placeholder="Wat is je naam?" ref="name" onChange={()=>this.changeHandler()} value={name} />
              {errors.name}
              </div>
              <div className="form_item">
                <label for="telefoon">telefoon</label>
                <input type="tel" id="telefoon" placeholder="+32 012 45 67 89" ref="phone" onChange={()=>this.changeHandler()} value={phone}/>
              {errors.phone}
              </div>
              <div className="form_item">
                <label for="email">email</label>
                <input type="email" id="email" name='email' placeholder="Wat is je e-mail adres?" ref="email" onChange={()=>this.changeHandler()} value={email}/>
              {errors.email}
              </div>
              <div className="form_item">
                <label for="password">wachtwoord</label>
                <input type="password" id="password" placeholder="Wat is je wachtwoord?" ref="password" onChange={()=>this.changeHandler()} value={password}/>
              {errors.password}
              </div>
              <input type="submit" value="registreren" />
            </form>
          </div>
          <div className="afbeelding">
            <img className="lachende_man" src="assets/img/lachende_man.png" />
          </div>
          <div className="page_title">
            <h1>Registreren</h1>
          </div>
        </main>
    );
  }
}
