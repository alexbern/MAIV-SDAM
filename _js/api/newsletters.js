'use strict';
import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import {basename} from '../globals/';

let base = `${basename}/api/newsletters`;

export const insert = (data) => {
  let method = 'POST';
  let body = buildBody(data, ['email', 'name']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(base, {method, body, headers})
    .then(checkStatus);
};

export default {
  insert
};
