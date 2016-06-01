'use strict';

import React from 'react';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';

import {App, Home, Register} from '../pages/';
import {createHistory} from 'history';
import {basename} from '../globals/';

export default () => {
  return (
    <Router history={useRouterHistory(createHistory)({basename})}>
      <Route path="/" component={App}>
        <IndexRedirect to="home" />
        <Route path="home" component={Home}/>
        <Route path="register" component={Register}/>
      </Route>
    </Router>
  );
};
