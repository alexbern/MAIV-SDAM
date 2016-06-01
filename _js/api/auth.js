'use strict';

import fetch from 'isomorphic-fetch';
import {checkStatus, buildBody} from '../util/';
import {clientId} from '../globals';

export const login = data =>{
  let body = buildBody(data, ['email', 'password'], {clientId});
  let method = 'POST';
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch('api/auth', {body, method, headers})
    .then(checkStatus)
    .then(({token})=>token);
};
