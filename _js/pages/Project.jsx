'use strict';

import React, {PropTypes} from 'react';
import {getProjectById} from '../api/projects';
import {isEmpty} from 'lodash';
import {Navigation, Stickynav, Footer} from '../components';
import {addVote, checkVote, deleteVote, countVotes} from '../api/votes';
import {size} from 'lodash';
import token from '../auth/token';
import {basename} from '../globals/';

export default class Project extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      nextProject: '',
      previousProject: '',
      project: '',
      votes: ''
    };
  }

  getNextProject(){
    let {id} = this.props.params;
    let nextid = (parseInt(id) + 1).toString();

    getProjectById(nextid)
      .then(nextProject => {
        this.setState({nextProject: nextProject});
      });
  }

  getPreviousProject(){
    let {id} = this.props.params;
    let previousid = (parseInt(id) - 1).toString();

    getProjectById(previousid)
      .then(previousProject => {
        this.setState({previousProject: previousProject});
      });
  }

  renderNewProject(id){
    this.context.router.push(`/project/${id}`);
    this.componentWillMount();
    this.renderNextProject();
    this.renderPreviousProject();
    this.forceUpdate();
  }

  renderNextProject(){
    let {nextProject} = this.state;
    if (!isEmpty(nextProject)) {
      let {id, name, img1, owner_id} = nextProject['0'];
      return (
        <div className="next_project project">
          <div className="tekst">
            <p className="type_woning">kamer</p>
            <p className="titel_woning">{name}</p>
          </div>
          <div className="afbeelding">
            <img src={`${basename}/uploads/${owner_id}/projects/${id}/imageone/${img1}`} />
          </div>
          <div className="cta" onClick={()=>this.renderNewProject(id)}>
            <p>volgend project</p>
            <img className="right_arrow" src={`${basename}/assets/img/arrow.svg`} />
          </div>
        </div>
      );
    }else{
      return (
        <div className="next_project project">
        </div>
      );
    }
  }

  renderPreviousProject(){
    let {previousProject} = this.state;
    if (!isEmpty(previousProject)) {
      console.log(previousProject);
      let {id, name, img1, owner_id} = previousProject['0'];
      return (
        <div className="previous_project project">
          <div className="tekst">
            <p className="type_woning">kamer</p>
            <p className="titel_woning">{name}</p>
          </div>
          <div className="afbeelding" ref='previous'>
            <img src={`${basename}/uploads/${owner_id}/projects/${id}/imageone/${img1}`} />
          </div>
          <div className="cta" onClick={()=>this.renderNewProject(id)}>
            <img className="left_arrow" src={`${basename}/assets/img/arrow.svg`} />
            <p>vorig project</p>
          </div>
        </div>
      );
    }else{
      return (
        <div className="previous_project project">
        </div>
      );
    }
  }

  componentWillMount(){
    let {id} = this.props.params;
    getProjectById(id)
      .then(project => {
        if (isEmpty(project)){
          this.context.router.push('/projects');
        }else{
          this.setState({project: project['0']});
        }
      })
      .then(()=>{
        if (isEmpty(this.state.project)) {
          this.context.router.push('/home');
        }else{
          this.countVotes();
        }
      })
      .then(this.getNextProject())
      .then(this.getPreviousProject());
  }

  componentWillUpdate(){
    let {project} = this.state;
    if (project) {
      let header = document.querySelector(`.project-header-backimg`);
      header.style.backgroundSize = 'cover';
      header.style.backgroundImage = `url(${basename}/uploads/${project.owner_id}/projects/${project.id}/imageone/${project.img1})`;
    }
  }

  countVotes(){
    let {project} = this.state;
    if (project) {
      countVotes(project.id)
        .then(votes => {
          let voteCount = size(votes.votes).toString();
          this.setState({votes: voteCount});
        });
    }
  }

  vote(){
    let {project} = this.state;
    if (project) {
      if (!token.content()) {
        return false;
      }else{
        let userid = token.content().user.id;
        let id = project.id;
        checkVote(userid, id)
          .then( votes => {
            if(isEmpty(votes.votes) === false) {
              //verwijderen
              deleteVote(userid, id)
                .then(this.countVotes());
            }
            if (isEmpty(votes.votes) === true) {
              let data = {userid: userid, id: id};
              addVote(data)
                .then(this.countVotes());
            }
          });
      }
    }
  }

  render() {
    let {votes, project} = this.state;
    return (
      <div className="project_detail">
        <header className='project-header-backimg'>
          <Navigation />
        </header>
        <Stickynav />
        <main>
          <section className="inleiding">
            <div className="container">
              <div className="intro_woorden">
                <p className="intro_woorden_tekst">{project.intro}</p>
                <div className="left">
                  <img className="left_image_top" src={`${basename}/uploads/${project.owner_id}/projects/${project.id}/imagetwo/${project.img2}`} />
                <img className="left_image_bottom" src={`${basename}/uploads/${project.owner_id}/projects/${project.id}/imagethree/${project.img3}`} />
                </div>
              </div>
              <div className="intro_tekst">
                <p>
                  <img src={`${basename}/uploads/${project.owner_id}/projects/${project.id}/imagefour/${project.img4}`} />
                  {project.description}
                </p>
                <div className="image">
                  <img className="right_image" src={`${basename}/uploads/${project.owner_id}/projects/${project.id}/imagefive/${project.img5}`} />
                </div>
              </div>
            </div>
          </section>
          <section className="afsluiting">
            <div className="container">
              <div className="samenvatting">
                <h3>kort samengevat</h3>
                <p>{project.shortdesc}</p>
              </div>
              <div className="punten">
                <div className="stemmen">
                  <p className="title">Verzamelde stemmen</p>
                  <span><p className="verzamelde_stemmen">{votes}</p>
                  <p className="te_verkrijgen_stemmen">/150</p></span>
                </div>
                <button className="stem_toevoegen" onClick={() => this.vote()}>stem toevoegen</button>
              </div>
            </div>
          </section>
          <section className="projecten">
            <div className="container">
              {this.renderPreviousProject()}
              {this.renderNextProject()}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}
