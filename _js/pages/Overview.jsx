'use strict';

import React, {PropTypes} from 'react';
import {getProjects, searchProjects, searchAllProjects} from '../api/projects';
import {getRooms, searchRooms, searchAllRooms} from '../api/rooms';
import {addVote, checkVote, deleteVote} from '../api/votes';
import {Navigation, Stickynav, Footer, Project, Room} from '../components';
import {isEmpty} from 'lodash';
import Emitter from '../events/';
import token from '../auth/token';
import {basename} from '../globals/';

export default class Overview extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      projects: '',
      search: ''
    };

    Emitter.on('vote', content=> this.voteHandler(content));
  }

  voteHandler(id){
    if (!token.content()) {
      return false;
    }else{
      let userid = token.content().user.id;
      checkVote(userid, id)
        .then( votes => {
          if(isEmpty(votes.votes) === false) {
            //verwijderen
            deleteVote(userid, id)
              .then(Emitter.emit('reload'));
          }
          if (isEmpty(votes.votes) === true) {
            let data = {userid: userid, id: id};
            addVote(data)
              .then(Emitter.emit('reload'));
          }
        });
    }
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
      if (window.location.search === '?type=rooms') {
        //zoek kamers
        searchAllRooms(this.state.search)
          .then(projects => this.setState({projects: projects}));
      }
      if (window.location.search === '?type=projects') {
        //zoekprojecten
        searchProjects(this.state.search)
          .then(projects => this.setState({projects: projects}));
      }
    }
  }

  componentWillMount(){
    if (window.location.search === '') {
      this.context.router.push('/home');
    }
    if(window.location.search === '?type=rooms' || window.location.search === '?type=projects'){
      if (window.location.search === '?type=rooms') {
        getRooms()
          .then(rooms => this.setState({projects: rooms}));
      }
      if (window.location.search === '?type=projects') {
        getProjects()
          .then(projects => this.setState({projects: projects}));
      }
    }else{
      this.context.router.push('/home');
      return;
    }
  }

  componentDidMount(){
    let {parentdiv} = this.refs;
    parentdiv.className += ' projecten';
  }

  renderItems(){
    if (window.location.search === '?type=rooms') {
      console.log('render rooms');
      let {projects} = this.state;
      if (projects) {
        return projects.rooms.map((room, i)=>{
          return <Room {...room} key={i}/>;
        });
      }
    }

    if (window.location.search === '?type=projects') {
      let {projects} = this.state;
      if (projects) {
        return projects.projects.map((project, i)=>{
          return <Project {...project} key={i}/>;
        });
      }
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="verblijven" ref='parentdiv'>
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
