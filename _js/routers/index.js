'use strict';

import React from 'react';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';

import {App, Home, Register, Login, Rooms, Projects, Project, Room, Submit} from '../pages/';
import {createHistory} from 'history';
import {basename} from '../globals/';
import token from '../auth/token';

const logout = (nextState, replace) => {
  if(token.clear()){
    replace({pathname: '/login'});
  }
};

const isLoggedIn = (nextState, replace)=>{
  if(!token.content()){
    replace({pathname: '/login'});
  }
};

export default () => {
  return (
    <Router history={useRouterHistory(createHistory)({basename})}>
      <Route path="/" component={App}>
        <IndexRedirect to="home" />
        <Route path="home" component={Home}/>
        <Route path="register" component={Register}/>
        <Route path="login" component={Login}/>
        <Route path="project/:id" component={Project}/>
        <Route path="room/:id" component={Room}/>
        <Route path="rooms" component={Rooms}/>
        <Route path="projects" component={Projects}/>
        <Route path="submit" component={Submit} onEnter={isLoggedIn}/>
        <Route path="logout" onEnter={logout}/>
      </Route>
    </Router>
  );
};
