'use strict';

import React, {PropTypes} from 'react';
import {getRooms, searchAllRooms} from '../api/rooms';
import {Navigation, Stickynav, Footer, Room} from '../components';
import {basename} from '../globals/';

export default class Rooms extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      projects: '',
      search: ''
    };
  }

  changeHandler(){
    let {search} = this.refs;
    this.setState({search: search.value});
  }

  submitHandler(e){
    e.preventDefault();
    let {search} = this.state;
    if (search === '') {
      return;
    }else{
      searchAllRooms(this.state.search)
        .then(rooms => this.setState({projects: rooms}));
    }
  }

  componentWillMount(){
    getRooms()
      .then(rooms => this.setState({projects: rooms}));
  }

  renderItems(){
    let {projects} = this.state;
    if (projects) {
      return projects.rooms.map((room, i)=>{
        return <Room {...room} key={i}/>;
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="verblijven">
        <header>
          <Navigation />
          <div className="header_images">
            <div className="header_images_container">
              <div className="text_container">
                <h1>Thuis de hoogstraat</h1>
                <p>Reserveer een verblijf in Hoogtel,<br/> en ervaar Schiedam alsof je er zelf leeft.</p>
              </div>
              <div className="images_container">
                <img className="vrienden" src={`${basename}/assets/img/vrienden.png`} />
              </div>
            </div>
          </div>
          <div className="header_background">
            {/*<img src="#" />*/}
          </div>
        </header>
        <Stickynav />
        <main>
          <form className="search" onSubmit={(e)=>this.submitHandler(e)}>
            <img src={`${basename}/assets/img/home.svg`} />
            <input type="text" placeholder="Naar wat voor verblijf ben je op zoek?" autofocus ref="search" onChange={()=>this.changeHandler()} />
            <input type="submit" value="zoeken" />
          </form>
          <div className="resultaten">
            <div className="container">
              {this.renderItems()}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
