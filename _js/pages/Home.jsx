'use strict';

import React from 'react';

import {Navigation, Listitem} from '../components';
import {searchRooms} from '../api/rooms';

export default class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      rooms: ''
    };
  }

  submitHandler(e){
    e.preventDefault();
    let {search} = this.state;
    if (search === '') {
      return;
    }else{
      searchRooms(search)
        .then(rooms => this.setState({rooms: rooms}));
    }
  }

  changeHandler(){
    let {search} = this.refs;
    this.setState({search: search.value});
  }

  render() {
    console.log(this.state);
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

        <form className='search-form' action='#' onSubmit={(e)=>this.submitHandler(e)}>
          <input type='text' className='search-input' onChange={()=>this.changeHandler()} ref="search" name='search' placeholder='Naar wat voor woning ben je op zoek?'/><button className='search-submit'>zoeken</button>
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
            </ul>
          </section>
        </section>
        <footer className='home-footer'>
        </footer>
      </div>
    );
  }
}
