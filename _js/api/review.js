'use strict';
import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import {basename} from '../globals/';

let base = `${basename}/api/reviews`;

export const getReviews = () => {
  return fetch(`${base}`)
    .then(checkStatus);
};

export const getReviewById = (id) => {
  return fetch(`${base}/${id}`)
    .then(checkStatus);
};

export const insertReview = (data) => {
  let method = 'POST';
  let body = buildBody(data, ['roomId', 'userId', 'sfeer', 'review', 'beauty', 'accomo', 'checkin', 'value', 'interior']);
  let headers = new Headers({'Content-Type': 'application/json'});

  return fetch(base, {method, body, headers})
    .then(checkStatus);
};

export default {
  getReviews,
  getReviewById,
  insertReview
};
