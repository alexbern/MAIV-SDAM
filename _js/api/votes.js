'use strict';
import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import {basename} from '../globals/';
import token from '../auth/token';

let base = `${basename}/api/votes`;

export const addVote = (data) => {
  let method = 'POST';
  let body = buildBody(data, ['userid', 'id']);
  let headers = new Headers({ 'x-auth-token': token.get(), 'Content-Type': 'application/json'});
  let credentials = 'include';
  return fetch(base, {method, body, headers, credentials})
    .then(checkStatus);
};

export const countVotes = (id) =>{
  let headers = new Headers({'x-auth-token': token.get()});

  return fetch(`${base}?project=${id}`, {headers})
    .then(checkStatus);
};

export const checkVote = (userid, projectid) =>{
  let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${base}?user=${userid}&project=${projectid}`, {headers})
    .then(checkStatus);
};

export const deleteVote = (userid, id) => {
  let method = 'DELETE';
  let headers = new Headers({'x-auth-token': token.get()});
  return fetch(`${base}?user=${userid}&project=${id}`, {method, headers})
    .then(checkStatus);
};

export default {
  addVote,
  countVotes,
  checkVote,
  deleteVote
};
