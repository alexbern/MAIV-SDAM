'use strict';

import React from 'react';
import {Navigation, Listitem, Stickynav, Footer} from '../components';

export default class Submit extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      image: ''
    };
  }

  onFileChangeHandler(e){
    this.setState({image: e.currentTarget.files[0]});
    console.log(e.currentTarget.files[0]);
  }

  render() {
    return (
      <form className="inzenden">
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
                    <label>commentaar</label>
                    <p>tekens 0 / 245</p>
                  </div>
                  <textarea placeholder="Geef hier een inleiding van je project op"></textarea>
                </div>
                <div className="form_item">
                  <div className="top">
                    <label>beschrijving</label>
                    <p>tekens 0 / 905</p>
                  </div>
                  <textarea placeholder="Geef hier een inleiding van je project op"></textarea>
                </div>
                <div className="form_item">
                  <div className="top">
                    <label>ten slotte</label>
                    <p>tekens 0 / 290</p>
                  </div>
                  <textarea placeholder="Geef hier een inleiding van je project op"></textarea>
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
                <div className="form_item">
                  <label for="image_5">Voeg een foto toe</label>
                  <input id="image_5" type="file" />
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
