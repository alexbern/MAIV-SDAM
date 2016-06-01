'use strict';

import React from 'react';

import {Navigation, Listitem} from '../components';

export default class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  renderItems(){
    console.log('rendering items');
  }

  render() {
    return (
      <div>
        <Navigation />
        <header className='search-header'>
          <div className='search-title-group'>
            <h1>Bewoon Schiedam</h1>
            <h3>Reserveer een huis in Hotel Hoogstraat, en ervaar Schiedam alsof je er zelf leeft</h3>
            <button>hoe werkt het?</button>
          </div>
        </header>

        <form className='search-form' action='#'>
          <input type='text' className='search-input' placeholder='Naar wat voor woning ben je op zoek?'/><button className='search-submit'>zoeken</button>
        </form>
        <section className='home-content'>
          <section className='home-mostviewed'>
            <h2>Meest Bekeken</h2>
            <ul>
              <Listitem />
              <Listitem />
              <Listitem />
              <Listitem />
              <Listitem />
              <Listitem />
              {this.renderItems()}
            </ul>
          </section>
        </section>
        <footer className='home-footer'>
        </footer>
      </div>
    );
  }
}
