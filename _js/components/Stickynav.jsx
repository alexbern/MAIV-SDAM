'use strict';

import React from 'react';
import {basename} from '../globals/';
import {Link} from 'react-router';
export default () => {

  const clickHandler = () =>{
    let overlay = document.querySelector('.overlay_menu');
    let img = document.querySelector('.sticky-nav-img');
    if (overlay.classList['1'] === 'hide') {
      overlay.classList.remove('hide');
      img.src = `${basename}/assets/img/cross.png`;
    }else{
      overlay.classList.add('hide');
      img.src = `${basename}/assets/img/menu.png`;
    }
  };


  return (
    <div className="navigatie sticky">
      <div className="container">
        <Link to="/home" className="logo">hoogtel</Link>
        <div className="boek_btn">
          <Link to="/submit">deelnemen</Link>
          <Link to='' className="blue_bg ham_menu" onClick={()=>clickHandler()}><img src={`${basename}/assets/img/menu.png`} className='sticky-nav-img'/></Link>
        </div>
      </div>
    </div>
    );
};
