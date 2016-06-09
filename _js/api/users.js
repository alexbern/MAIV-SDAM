'use strict';

import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import {basename} from '../globals/';
import token from '../auth/token';

let base = `${basename}/api/users`;

let whitelist = {
  POST: ['name', 'password', 'email', 'phone', 'image']
};

export const insert = data => {
  let method = 'POST';
  let body = buildBody(data, whitelist.POST);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(base, {method, body, headers})
    .then(checkStatus);
};

export const selectAll = () =>{
  let headers = new Headers({ 'x-auth-token': token.get(), 'Content-Type': 'application/json'});
  return fetch(base, {headers})
    .then(checkStatus);
};

export const selectUser = (id) =>{
  let headers = new Headers({ 'x-auth-token': token.get(), 'Content-Type': 'application/json'});
  return fetch(`${base}/${id}`, {headers})
    .then(checkStatus);
};

export default{
  insert,
  selectAll,
  selectUser
};
