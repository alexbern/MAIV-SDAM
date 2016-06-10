'use strict';

import React, {PropTypes} from 'react';
import {getProjects, searchProjects} from '../api/projects';
import {addVote, checkVote, deleteVote} from '../api/votes';
import {Navigation, Stickynav, Footer, Project, Overlay} from '../components';
import {isEmpty} from 'lodash';
import Emitter from '../events/';
import token from '../auth/token';
import {basename} from '../globals/';

export default class Projects extends React.Component {

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
      searchProjects(this.state.search)
        .then(projects => this.setState({projects: projects}));
    }
  }

  componentWillMount(){
    getProjects()
      .then(projects => this.setState({projects: projects}));
  }

  renderItems(){
    let {projects} = this.state;
    if (projects) {
      return projects.projects.map((project, i)=>{
        return <Project {...project} key={i}/>;
      });
    }
  }

  render() {
    return (
      <div className="projecten">
        <header>
          <Navigation />
          <div className="header_images">
            <div className="header_images_container">
              <div className="text_container">
                <h1>Thuis de hoogstraat</h1>
                <p>Reserveer een verblijf in Hoogtel,<br/> en ervaar Schiedam alsof je er zelf leeft.</p>
              </div>
              <div className="images_container">
                <img class="bebaarde_man" src={`${basename}/assets/img/bebaarde_man.png`} />
                <img class="vrouw" src={`${basename}/assets/img/lachende_dame.png`} />
              </div>
            </div>
          </div>
          <div className="header_background">
            {/*<img src="#" />*/}
          </div>
        </header>
        <Overlay/>
        <Stickynav />
        <main>
          <form className="search" onSubmit={(e)=>this.submitHandler(e)}>
            <img src={`${basename}/assets/img/home.svg`} />
            <input type="text" placeholder="Naar wat voor project ben je op zoek?" autofocus ref="search" onChange={()=>this.changeHandler()} />
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
