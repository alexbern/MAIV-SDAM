'use strict';

import React, {PropTypes} from 'react';
import {getRoomById} from '../api/rooms';
import {isEmpty} from 'lodash';
import {basename} from '../globals/';

export default class Room extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentWillMount(){
    let {id} = this.props.params;
    getRoomById(id)
      .then(project => {
        this.setState({project: project});
      })
      .then(()=>{
        if (isEmpty(this.state.project.room)) {
          this.context.router.push('/home');
        }
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="kamer_detail">
        <header>
          <div className="navigatie not_sticky">
            <div className="container">
              <a href="index.html" className="logo">hoogtel</a>
              <nav>
                <ul>
                  <li><a href="verblijven.html">onze kamers</a></li>
                  <li><a href="projecten.html">ingezonden projecten</a></li>
                  {/*<!--<li><a href="over.html">over hoogtel</a></li>-->*/}
                </ul>
              </nav>
              <div className="boek_btn">
                <a href="#">boeken</a>
              </div>
            </div>
          </div>
          <div className="header_background">
            <img src={`${basename}/assets/img/jenever_1.jpg`} />
          </div>
        </header>
        <div className="navigatie sticky">
          <div className="container">
            <a href="index.html" className="logo">hoogtel</a>
            <div className="boek_btn">
              <a href="#">boeken</a>
              <a href="#" className="blue_bg">menu</a>
            </div>
          </div>
        </div>
        <main>
          <section className="info">
            <div className="left">
              <div className="tekst">
                <h1 className="woning_titel">Het Jeneverappartement</h1>
                <p className="woning_ondertitel">heerlijk knus</p>
              </div>
              <a href="#" className="cta">nu boeken</a>
            </div>
            <div className="right">
              <div className="info_detail">
                <p className="info_title">type woning</p>
                <p className="info_tekst">Een knus appartement, centraal in de Hoogstraat</p>
              </div>
              <div className="info_detail">
                <p className="info_title">aantal gasten</p>
                <p className="info_tekst">Er is in het appartement plaats genoeg voor vier personen</p>
              </div>
              <div className="info_detail">
                <p className="info_title">slaapkamers</p>
                <p className="info_tekst">De woonst is voorzien van twee slaapkamers, elk met aparte bedden.</p>
              </div>
            </div>
          </section>
          <section className="kamer_inleiding">
            <div className="container">
              <div className="left">
                <h2>We will not get bullied by perception any longer.</h2>
                <img src={`${basename}/assets/img/jenever_2.jpg`} />
              </div>
              <div className="right">
                <div className="image">
                  <img src={`${basename}/assets/img/jenever_3.jpg`} />
                </div>
                <div className="image">
                  <img src={`${basename}/assets/img/jenever_4.jpg`} />
                </div>
                <p>Bij het boeken van deze kamer kan een echte Schiedamse Jeneverproeverij natuurlijk niet ontbreken. Daarom krijgt u deze van ons inclusief, te boeken op elk gewenste datum en tijdstip.</p>
              </div>
            </div>
          </section>
          <section className="kamer_beschrijving">
            <div className="container">
              <div className="left">
                <div className="tekst">
                  <h3>Over dit vebrlijf</h3>
                  <p>Dit appartement is geheel ingericht met overblijfselen uit een oude Jeneverfabriek. Zo werden oude jenevervaten gebruikt voor het bed en de kledingkast. Oude jeneverflessen werden opnieuw omgesmolten om het douchemeubel te maken. Alles tezamen biedt een comfortabele kamer met aandacht voor authenticiteit.</p>

                </div>
                <div className="image">
                  <img src={`${basename}/assets/img/jenever_5.jpg`} />
                </div>
              </div>
              <div className="right">
                <h4>De ruimte</h4>
                <ul className="ruimte_list">
                  <li>Aantal personen: 2</li>
                  <li>Badkamers: 1</li>
                  <li>Bed Type: Echt bed</li>
                  <li>Slaapkamers: 2</li>
                  <li>Bedden: 2</li>
                  <li>Aankomst: Op elk moment na 12:00</li>
                  <li>Vertrek: 11:00</li>
                  <li>Woning type: Appartement</li>
                </ul>
                <h4>Voorzieningen</h4>
                <ul className="voorziening_list">
                  <li>Keuken</li>
                  <li>Internet</li>
                  <li>Televisie</li>
                  <li>Basisbehoeften</li>
                  <li>Shampoo</li>
                  <li>Verwarming</li>
                </ul>
                <h4>Huisregels</h4>
                <ul className="huisregel_list">
                  <li>Niet roken</li>
                  <li>Niet geschikt voor huisdieren</li>
                  <li>Geen feestjes of evenementen</li>
                  <li>Niet kindvriendelijk (0-12 jaar)</li>
                  <li>Inchecktijd na 12:00</li>
                </ul>
              </div>
              <div className="bottom_image">
                <img src={`${basename}/assets/img/jenever_6.jpg`} />
              </div>
            </div>
          </section>
          <section className="recensies">
            <div className="container">
              <h2>Recensies</h2>
              <h3>samengevat</h3>
              <ul className="samengevat">
                <li className="item">
                  <p className="left">Schoon?</p>
                  <div className="right">
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                  </div>
                </li>
                <li className="item">
                  <p className="left">Schoon?</p>
                  <div className="right">
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                  </div>
                </li>
                <li className="item">
                  <p className="left">Schoon?</p>
                  <div className="right">
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                  </div>
                </li>
                <li className="item">
                  <p className="left">Schoon?</p>
                  <div className="right">
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                  </div>
                </li>
                <li className="item">
                  <p className="left">Schoon?</p>
                  <div className="right">
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                  </div>
                </li>
                <li className="item">
                  <p className="left">Schoon?</p>
                  <div className="right">
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                    <img src={`#`} />
                  </div>
                </li>
              </ul>
              <h3>Wat anderen zeggen</h3>
              <ul className="reviews">
                <li className="review">
                  <div className="left">
                    <img className="persoon_image" src={`${basename}/assets/img/meisje.png`} />
                    <p>Nicola</p>
                  </div>
                  <p className="right">
                  Don't be mad at the truth. When you don't like me you are merely shooting the messenger. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I speak truth to power!!! It wasn’t any Kanyes.
                  </p>
                </li>
                <li className="review">
                  <div className="left">
                    <img className="persoon_image" src={`${basename}/assets/img/meisje.png`} />
                    <p>Nicola</p>
                  </div>
                  <p className="right">
                  Don't be mad at the truth. When you don't like me you are merely shooting the messenger. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I speak truth to power!!! It wasn’t any Kanyes.
                  </p>
                </li>
                <li className="review">
                  <div className="left">
                    <img className="persoon_image" src={`${basename}/assets/img/meisje.png`} />
                    <p>Nicola</p>
                  </div>
                  <p className="right">
                  Don't be mad at the truth. When you don't like me you are merely shooting the messenger. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I speak truth to power!!! It wasn’t any Kanyes.
                  </p>
                </li>
                <li className="review">
                  <div className="left">
                    <div className="persoon_image">
                      <img src={`${basename}/assets/img/meisje.png`} />
                    </div>
                    <p>Nicola</p>
                  </div>
                  <p className="right">
                  Don't be mad at the truth. When you don't like me you are merely shooting the messenger. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I speak truth to power!!! It wasn’t any Kanyes.
                  </p>
                </li>
              </ul>
            </div>
          </section>
          <section className="aanbevolen">
            <div className="container">
              <div className="scroller">
                <div className="lijst">
                  <div className="resultaat">
                    <div className="top">
                      <img src={`#`} />
                    </div>
                    <div className="bottom">
                      <p className="item_title">Klassieke woning</p>
                      <p>I gotta say at that time I’d like to meet Kanye That dreams will actualize. Dreams will manifest.</p>
                      <div className="cta">
                        <a href="#">Toon me meer</a>
                        <img src={`#`} />
                      </div>
                    </div>
                  </div>
                  <div className="resultaat">
                    <div className="top">
                      <img src={`#`} />
                    </div>
                    <div className="bottom">
                      <p className="item_title">Klassieke woning</p>
                      <p>I gotta say at that time I’d like to meet Kanye That dreams will actualize. Dreams will manifest.</p>
                      <div className="cta">
                        <a href="#">Toon me meer</a>
                        <img src={`#`} />
                      </div>
                    </div>
                  </div>
                  <div className="resultaat">
                    <div className="top">
                      <img src={`#`} />
                    </div>
                    <div className="bottom">
                      <p className="item_title">Klassieke woning</p>
                      <p>I gotta say at that time I’d like to meet Kanye That dreams will actualize. Dreams will manifest.</p>
                      <div className="cta">
                        <a href="#">Toon me meer</a>
                        <img src={`#`} />
                      </div>
                    </div>
                  </div>
                  <div className="resultaat">
                    <div className="top">
                      <img src={`#`} />
                    </div>
                    <div className="bottom">
                      <p className="item_title">Klassieke woning</p>
                      <p>I gotta say at that time I’d like to meet Kanye That dreams will actualize. Dreams will manifest.</p>
                      <div className="cta">
                        <a href="#">Toon me meer</a>
                        <img src={`#`} />
                      </div>
                    </div>
                  </div>
                  <div className="resultaat">
                    <div className="top">
                      <img src={`#`} />
                    </div>
                    <div className="bottom">
                      <p className="item_title">Klassieke woning</p>
                      <p>I gotta say at that time I’d like to meet Kanye That dreams will actualize. Dreams will manifest.</p>
                      <div className="cta">
                        <a href="#">Toon me meer</a>
                        <img src={`#`} />
                      </div>
                    </div>
                  </div>
                  <div className="resultaat">
                    <div className="top">
                      <img src={`#`} />
                    </div>
                    <div className="bottom">
                      <p className="item_title">Klassieke woning</p>
                      <p>I gotta say at that time I’d like to meet Kanye That dreams will actualize. Dreams will manifest.</p>
                      <div className="cta">
                        <a href="#">Toon me meer</a>
                        <img src={`#`} />
                      </div>
                    </div>
                  </div>
                  <div className="resultaat">
                    <div className="top">
                      <img src={`#`} />
                    </div>
                    <div className="bottom">
                      <p className="item_title">Klassieke woning</p>
                      <p>I gotta say at that time I’d like to meet Kanye That dreams will actualize. Dreams will manifest.</p>
                      <div className="cta">
                        <a href="#">Toon me meer</a>
                        <img src={`#`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="background-tekst">
                <div className="inner_container">
                  <p className="small">Zag je dit al?</p>
                  <p className="big">Aanbevoelen, <br/> voor jou.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer>
          <div className="container">
            <div className="contact">
              <p className="footer_title">CONTACT</p>
              <ul>
                <li><a href="mailto:hallo@jonasleupe.be">hallo@jonasleupe.be</a></li>
                <li><a href="tel:0032495195774">+32 495 19 57 74</a></li>
              </ul>
            </div>
            <div className="adres">
              <p className="footer_title">adres</p>
              <a href="#">Hoogstraat 1<br/>3111 Schiedam, Nederland</a>
            </div>
            <div className="nieuwsbrief">
              <p className="footer_title">nieuwsbrief</p>
              <input type="text" placeholder="Naam" required />
              <input type="email" placeholder="E-mail adres" required />
              <button type="submit">inschrijven</button>
            </div>
            <div className="social">
              <p className="footer_title">sociaal</p>
              <ul>
                <li><a href="http://www.facebook.com/">Facebook</a></li>
                <li><a href="http://www.instagram.com/">Instagram</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
