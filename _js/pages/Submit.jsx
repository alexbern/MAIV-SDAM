'use strict';

import React from 'react';
import {Navigation, Stickynav, Footer} from '../components';
import token from '../auth/token';
import {isEmpty} from 'lodash';
import {insert} from '../api/projects';

export default class Submit extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      image: ''
    };
  }

  componentWillMount(){
    this.setState({
      ownerid: token.content().user.id
    });
  }

  onFileChangeHandler(e){
    this.setState({image: e.currentTarget.files[0]});
  }

  changeHandler(){
    let {intro, description, shortdesc} = this.refs;
    this.setState({
      description: description.value,
      shortdesc: shortdesc.value,
      intro: intro.value
    });
  }

  validate(){
    let {description, shortdesc, ownerid, intro, image} = this.state;
    let errors = {};
    if (!description) {
      errors.description = 'geen beschrijving gegeven';
    }
    if (!image) {
      errors.image = 'geen foto gegeven';
    }
    if (!shortdesc) {
      errors.shortdesc = 'geen commentaar gegeven';
    }
    if (!intro) {
      errors.intro = 'geen slot gegeven';
    }
    if (!ownerid) {
      errors.ownerid = 'geen beheerder gegeven';
    }
    return errors;
  }

  submitHandler(e){
    e.preventDefault();
    let errors = this.validate();
    if (isEmpty(errors)) {
      insert(this.state);
    }else{
      console.error(errors);
      this.setState({errors: errors});
    }
  }

  render() {
    return (
      <form className="inzenden" onSubmit={(e)=>this.submitHandler(e)}>
        <input type="hidden" name="MAX_FILE_SIZE" value="2000000" />
        <header>
          <Navigation />
          <div className="header_tekst">
            <label className="btn btn_fill">Voeg een omslagfoto toe<input type='file' name='img1' accept="image/*" ref="file" onChange={(e)=>this.onFileChangeHandler(e)}/></label>
          </div>
        </header>
        <Stickynav />
        <main>
          <form>
            <div className="form_container">
              <div className="left">
                <div className="form_item">
                  <div className="top">
                    <label>titel</label>
                  </div>
                  <textarea placeholder="Geef hier een inleiding van je project op" ref="title" onChange={()=>this.changeHandler()}></textarea>
                </div>
                <div className="form_item">
                  <div className="top">
                    <label>commentaar</label>
                    <p>tekens 0 / 245</p>
                  </div>
                  <textarea placeholder="Geef hier een inleiding van je project op" ref="shortdesc" onChange={()=>this.changeHandler()}></textarea>
                </div>
                <div className="form_item">
                  <div className="top">
                    <label>beschrijving</label>
                    <p>tekens 0 / 905</p>
                  </div>
                  <textarea placeholder="Geef hier een beschrijving van je project op" ref="description" onChange={()=>this.changeHandler()}></textarea>
                </div>
                <div className="form_item">
                  <div className="top">
                    <label>ten slotte</label>
                    <p>tekens 0 / 290</p>
                  </div>
                  <textarea placeholder="Geef hier een slot van je project op" ref="intro" onChange={()=>this.changeHandler()}></textarea>
                </div>
              </div>
              <div className="right">
                <div className="form_item">
                  <label for="image_1">Voeg een foto toe</label>
                  <input id="image_1" type="file" />
                </div>
                <div className="form_item">
                  <label for="image_2">Voeg een foto toe</label>
                  <input id="image_2" type="file" />
                </div>
                <div className="form_item">
                  <label for="image_3">Voeg een foto toe</label>
                  <input id="image_3" type="file" />
                </div>
                <div className="form_item">
                  <label for="image_4">Voeg een foto toe</label>
                  <input id="image_4" type="file" />
                </div>
              </div>
            </div>
            <input type="submit" value="Inzenden" />
          </form>
        </main>
        <Footer />
      </form>
    );
  }
}
