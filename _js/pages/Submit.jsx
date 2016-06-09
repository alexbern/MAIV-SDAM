'use strict';

import React, {PropTypes} from 'react';
import {Navigation, Stickynav, Footer} from '../components';
import token from '../auth/token';
import {isEmpty} from 'lodash';
import {insert} from '../api/projects';

export default class Submit extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentWillMount(){
    this.setState({
      ownerid: token.content().user.id
    });
  }

  onFileChangeHandlerOne(e){
    this.setState({imageone: e.currentTarget.files[0]});
    // let filepath = e.currentTarget.files['0'];
    // header.style.backgroundImage = `url('${filepath}')`;
  }

  onFileChangeHandlerTwo(e){
    this.setState({imagetwo: e.currentTarget.files[0]});
  }

  onFileChangeHandlerThree(e){
    this.setState({imagethree: e.currentTarget.files[0]});
  }

  onFileChangeHandlerFour(e){
    this.setState({imagefour: e.currentTarget.files[0]});
  }

  onFileChangeHandlerFive(e){
    this.setState({imagefive: e.currentTarget.files[0]});
  }

  changeHandler(){
    let {intro, description, shortdesc, title} = this.refs;
    this.setState({
      description: description.value,
      shortdesc: shortdesc.value,
      intro: intro.value,
      title: title.value
    });
  }

  validate(){
    let {description, shortdesc, ownerid, intro, imageone, imagetwo, imagethree, imagefour, imagefive, title} = this.state;
    let errors = {};
    if (!description) {
      errors.description = 'geen beschrijving gegeven';
    }
    if (!title) {
      errors.title = 'geen titel gegeven';
    }
    if (!imageone) {
      errors.imageone = 'foto 1 ontbreekt';
    }
    if (!imagetwo) {
      errors.imagetwo = 'foto 2 ontbreekt';
    }
    if (!imagethree) {
      errors.imagethree = 'foto 3 ontbreekt';
    }
    if (!imagefour) {
      errors.imagefour = 'foto 4 ontbreekt';
    }
    if (!imagefive) {
      errors.imagefive = 'foto 5 ontbreekt';
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
      insert(this.state)
        .then(this.context.router.push('/projects'));
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
            <label className="btn btn_fill">Voeg een omslagfoto toe<input type='file' name='img1' accept="image/*" ref="file" onChange={(e)=>this.onFileChangeHandlerOne(e)}/></label>
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
                  <label for="image_1" >Voeg een foto toe<input id="image_1" type="file" onChange={(e)=>this.onFileChangeHandlerTwo(e)}/></label>
                </div>
                <div className="form_item">
                  <label for="image_2">Voeg een foto toe<input id="image_2" type="file" onChange={(e)=>this.onFileChangeHandlerThree(e)}/></label>
                </div>
                <div className="form_item">
                  <label for="image_3">Voeg een foto toe<input id="image_3" type="file" onChange={(e)=>this.onFileChangeHandlerFour(e)}/></label>
                </div>
                <div className="form_item">
                  <label for="image_4">Voeg een foto toe<input id="image_4" type="file" onChange={(e)=>this.onFileChangeHandlerFive(e)}/></label>
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
