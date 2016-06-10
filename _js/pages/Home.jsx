'use strict';

import React, {PropTypes} from 'react';

import {Navigation, Listitem, Stickynav, Footer, Overlay} from '../components';
import {searchRooms} from '../api/rooms';
import token from '../auth/token';
import {basename} from '../globals/';
import {Link} from 'react-router';

export default class Home extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      rooms: ''
    };
  }

  componentDidMount(){
    if (token.content() && token.content().user.email) {
      this.setState({email: token.content().user.email});
    }
    if (token.content() && token.content().user.name) {
      this.setState({name: token.content().user.name});
    }
  }

  submitHandler(e){
    e.preventDefault();
    let {search} = this.state;
    if (search === '') {
      return;
    }else{
      searchRooms(search)
        .then(rooms => this.setState({rooms: rooms}))
        .then(()=>{
          let selection = document.querySelector('.empty_result');
          selection.classList.remove('empty_result');
          selection.classList.add('no_emptry_result');
        });
    }
  }

  changeHandler(){
    let {search} = this.refs;
    this.setState({search: search.value});
  }

  renderResults(){
    let {rooms} = this.state;
    if (rooms) {
      return rooms.rooms.map((room, i)=>{
        return <Listitem {...room} key={i} />;
      });
    }

  }

  render() {
    return (
      <div className='homepage'>
        <header>
          <Navigation />
          <div className="header_images">
            <div className="header_images_container">
              <div className="text_container">
                <h1>Bewoon Schiedam</h1>
                <p>Reserveer een verblijf in Hoogtel,<br/> en ervaar Schiedam alsof je er zelf leeft.</p>
              </div>
              <div className="images_container">
                <img className="meisje" src={`${basename}/assets/img/meisje.png`} />
                <img className="vrouwen" src={`${basename}/assets/img/vrouwen.png`} />
              </div>
            </div>
          </div>
          <div className="header_background">
          </div>
        </header>
        <Overlay/>
        <Stickynav />
        <main>
          <form className="search" onSubmit={(e)=>this.submitHandler(e)} action='#'>
            <img src={`${basename}/assets/img/home.svg`} />
            <input type="text" placeholder="Naar wat voor verblijf ben je op zoek?" autofocus onChange={()=>this.changeHandler()} ref="search"/>
            <input type="submit" value="zoeken" />
          </form>
          <div className="resultaten empty_result">
            <div className="container">
              {this.renderResults()}
            </div>
          </div>
          <div className="verblijf">
            <div className="container">
              <h2 className="pink">Verblijven</h2>
              <div className="top">
                <div className="verblijf_tekst">
                  <h3>Word een tijdelijke Schiedammer</h3>
                  <p>Schiedam is een gezellig stadje dichtbij Rotterdam. In tegenstelling tot het drukke leven in Rotterdam biedt het een mooi evenwicht met meer rust, aandacht voor ambacht, sfeer en gezelligheid.</p>
                </div>
                <div className="image_rechts_top">
                  <img src={`${basename}/assets/img/verblijf_1.jpg`} />
                </div>
              </div>
              <div className="images_bottom">
                <div className="left">
                  <img src={`${basename}/assets/img/verblijf_2.jpg`} />
                </div>
                <div className="right">
                  <div className="image groot_beeld">
                    <img src={`${basename}/assets/img/verblijf_1.jpg`} />
                  </div>
                  <div className="image groot_beeld">
                    <img src={`${basename}/assets/img/verblijf_2.jpg`} />
                  </div>
                  <div className="image">
                    <img src={`${basename}/assets/img/verblijf_3.jpg`} />
                  </div>
                  <div className="image">
                    <img src={`${basename}/assets/img/verblijf_4.jpg`} />
                  </div>
                  <div className="image">
                    <img src={`${basename}/assets/img/verblijf_5.jpg`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tussen_tekst">
            <div className="container">
              <p>De Schiedamse Hoogstraat was ooit de Kalverstraat van Schiedam. Door de opkomst van webwinkels. de Schiedamse passage en de leegstand is deze gezellige straat helaas niet meer wat het was. Ondanks de rust is de Hoogstraat nog steeds een mooie straat met mooi gerestaureerde gebouwen, schattige speciaalzaken en een centrale plek in Schiedam. Dichtbij de Havenstraat, de Oude Markt en het Stedelijk Museum is Hoogtel daarom een mooie uitvalsbasis voor een stedentripje. Ook Rotterdam is binnen 10 minuten te bereiken met het goed georganiseerde openbaar vervoer (tramhalte in directe omgeving van de Hoogstraat)</p>
            </div>
          </div>
          <div className="ontwerp">
            <h2 className="blue">Ontwerp</h2>
            <div className="image_top_right">
              <img src={`${basename}/assets/img/ontwerp_1.jpg`} />
            </div>
            <div className="tekst_container">
              <div className="tekst">
                <h4>Student David Romero richtte voor zijn eindwerk een van onze verblijven in.</h4>
                <p>Geïnspireerd op de oude Schiedamse Jeneverstokerijen, richtte David ons verblijf in met o.a. meubels gemaakt van oude jenevervaten en gerycleden jeneverflessen. Door dit alles in een nieuw jasje te steken creëerde hij een sfeervol verblijf met aandacht voor zowel ambacht als design.</p>
              </div>
              <div className="buttons">
                <Link to='/home' className="btn btn_border">lees meer</Link>
                <Link to='/submit' className="btn btn_fill">deelnemen</Link>
              </div>
            </div>
            <div className="ontwerp_background">
              <img src={`${basename}/assets/img/ontwerp_2.jpg`} />
              <div className="background_fill"></div>
            </div>
          </div>
          <div className="winkels">
            <div className="container">
              <h2 className="yellow">Winkels</h2>
              <div className="images">
                <div className="image_top_left">
                  <img src={`${basename}/assets/img/winkel_1.jpg`} />
                </div>
                <div className="image_right">
                  <img src={`${basename}/assets/img/winkel_2.jpg`} />
                </div>
              </div>
              <div className="tekst">
                <h3>een plek vol contrasten</h3>
                <h4>De verschillende boetiekjes, speciaalzaakjes en horecagelegenheden in Schiedam.</h4>
                <p>Hoogtel beschikt over veel verschillende speciaalzaken en boetiekjes. Je kunt er gezellig wat eten of een drankje drinken op een van de gezellige terrasjes. Ook de dichtbijgelegen Oude Markt beschikt over een aantal knusse eetgelegenheden.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
