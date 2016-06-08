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
    // this.renderNextProject();
    // this.renderPreviousProject();
    this.forceUpdate();
  }

  renderNextProject(){
    let {nextProject} = this.state;
    if (!isEmpty(nextProject)) {
      let {id, name, img1} = nextProject['0'];
      return (
        <div className="next_project project">
          <div className="tekst">
            <p className="type_woning">kamer</p>
            <p className="titel_woning">{name}</p>
          </div>
          <div className="afbeelding">
            <img src={`${basename}/assets/img/${img1}`} />
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
      let {id, name} = previousProject['0'];
      return (
        <div className="previous_project project">
          <div className="tekst">
            <p className="type_woning">kamer</p>
            <p className="titel_woning">{name}</p>
          </div>
          <div className="afbeelding">
            <img src="#" />
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
        this.setState({project: project});
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

  countVotes(){
    let {project} = this.state;
    if (project) {
      countVotes(project['0'].id)
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
        let id = project['0'].id;
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
    let {votes} = this.state;
    console.log(this.state);
    return (
      <div className="project_detail">
        <header>
          <Navigation />
        </header>
        <Stickynav />
        <main>
          <section className="inleiding">
            <div className="container">
              <div className="intro_woorden">
                <p className="intro_woorden_tekst">De babbersmolen is helaas niet open voor bezichtiging.. Met dit project brengen we de molen naar naar Hoogtel. Zo kan je er voor een poosje in verblijven.</p>
                <div className="left">
                  <img className="left_image_top" src={`${basename}/assets/img/molen_1.jpg`} />
                  <img className="left_image_bottom" src={`${basename}/assets/img/molen_2.jpg`} />
                </div>
              </div>
              <div className="intro_tekst">
                <p>
                  <img src={`${basename}/assets/img/molen_persoon.jpg`} />
                   Ik, Bas Batenburg, ben al jaren molenaar in de Babbersmolen. Door de restauratie van de afgelopen jaren is helaas veel van het authentieke interieur van de Babbersmolen verloren gegaan. Met behulp van oud beeldmateriaal van de Babbersmbolen lijkt het me ontzettend leuk om een van de lege ruimtes in de Hoogstraat zo in te richten. Op deze manier komt de Babbersmolen weer tot leven. Een heerlijk weekendje weg met partner of het gezin is bestemd voor deze molen en maakt uw verblijf erg origineel. Daarbij is deze plek de ideale uitvalsbasis om Schiedam en/of Rotterdam te verkennen.Deze aparte logeerplek biedt plaats voor maximaal 6 personen met haar 3 slaapkamers. Deze vakantiewoning beschikt u over WiFi, een schattig tuintje met charmant terras waar u heerlijk kunt genieten van de natuur, een barbecue en voldoende mogelijkheden om de kinderen te vermaken mocht u die mee willen nemen voor een leuk weekendje weg.

                </p>
                <div className="image">
                  <img className="right_image" src={`${basename}/assets/img/molen_3.jpg`} />
                </div>
              </div>
            </div>
          </section>
          {/*<!-- <section className="toekomstplannen">
            <p>I stand with the utmost humility. We are so blessed!!! All praises and blessings to the families of people who never gave up on dreams in the past the press/old guard and powers that be would have silenced me a long time ago but I have a form of social immunity. Don't be scared of the truth because we need to restart the human foundation in truth. I’m really excited to get our first best dressed.</p>
          </section> -->*/}
          <section className="afsluiting">
            <div className="container">
              <div className="samenvatting">
                <h3>kort samengevat</h3>
                <p>Alsof u in de oude Babbersmolen aan het overnachten bent. Nagebouwd van oude foto’s en toch midden in de stad Schiedam. Aandacht voor authenticiteit, comfort en natuurlijk een knusse sfeer.</p>
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
        <script type="text/javascript" src="js/script.js"></script>
      </div>
    );
  }
}
