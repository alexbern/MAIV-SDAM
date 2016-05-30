'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Router from './routers/';

const init = () =>{
  ReactDOM.render(
    <Router/>,
    document.querySelector('.react-app')
  );
};

init();
