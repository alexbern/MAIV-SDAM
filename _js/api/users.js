'use strict';

import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import {basename} from '../globals/';

let base = `${basename}/api/users`;

export const insert = data => {
  let method = 'POST';
  let body = buildBody(data, ['name', 'password', 'email', 'phone']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(base, {method, body, headers})
    .then(checkStatus);
};

export const selectAll = () =>{
  return fetch(base)
    .then(checkStatus);
};

export const selectUser = (id) =>{
  return fetch(`${base}/${id}`)
    .then(checkStatus);
};

export default{
  insert,
  selectAll,
  selectUser
};
