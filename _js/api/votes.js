'use strict';
import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import {basename} from '../globals/';

let base = `${basename}/api/votes`;

export const addVote = (data) => {
  let method = 'POST';
  let body = buildBody(data, ['userid', 'id']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(base, {method, body, headers})
    .then(checkStatus);
};

export const countVotes = (id) =>{
  return fetch(`${base}?project=${id}`)
    .then(checkStatus);
};

export const checkVote = (userid, projectid) =>{
  return fetch(`${base}?user=${userid}&project=${projectid}`)
    .then(checkStatus);
};

export const deleteVote = (userid, id) => {
  let method = 'DELETE';
  return fetch(`${base}?user=${userid}&project=${id}`, {method})
    .then(checkStatus);
};

export default {
  addVote,
  countVotes,
  checkVote,
  deleteVote
};
