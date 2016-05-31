'use strict';

import React from 'react';

export default class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <nav className='navigation'>
          <ul className='navigation-wrapper-list'>
            <li className='hoogtel'>hoogtel</li>
            <div className='navigation-options'>
              <li>Plan je bezoek</li>
              <li>Word ambassadeur</li>
              <li>Onze kamers</li>
            </div>
            <li className='login'>Aanmelden</li>
          </ul>
        </nav>
        <header className='search-header'>
          <div className='search-title-group'>
            <h1>Bewoon Schiedam</h1>
            <h3>Reserveer een huis in Hotel Hoogstraat, en ervaar Schiedam alsof je er zelf leeft</h3>
            <button>hoe werkt het?</button>
          </div>
        </header>
        <section className='home-content'>
          <section className='home-mostviewed'>
            <h2>Meest Bekeken</h2>
            <ul>
              <li className='listItem'>
                <img src='/assets/img/temp.png' className='listItemImage'/>
                <article className='listItemInfo'>
                  <h3>Lorem ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>
              </li>

              <li className='listItem'>
                <img src='/assets/img/temp.png' className='listItemImage'/>
                <article className='listItemInfo'>
                  <h3>Lorem ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>
              </li>

              <li className='listItem'>
                <img src='/assets/img/temp.png' className='listItemImage'/>
                <article className='listItemInfo'>
                  <h3>Lorem ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>
              </li>

              <li className='listItem'>
                <img src='/assets/img/temp.png' className='listItemImage'/>
                <article className='listItemInfo'>
                  <h3>Lorem ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>
              </li>

              <li className='listItem'>
                <img src='/assets/img/temp.png' className='listItemImage'/>
                <article className='listItemInfo'>
                  <h3>Lorem ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>
              </li>

              <li className='listItem'>
                <img src='/assets/img/temp.png' className='listItemImage'/>
                <article className='listItemInfo'>
                  <h3>Lorem ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>
              </li>
            </ul>
          </section>
        </section>
        <footer className='home-footer'>
        </footer>
      </div>
    );
  }
}
