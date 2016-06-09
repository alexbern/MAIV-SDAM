'use strict';
import fetch from 'isomorphic-fetch';
import {checkStatus} from '../util';
import {basename} from '../globals/';

let base = `${basename}/api/rooms`;

export const getRooms = () => {
  return fetch(`${base}`)
    .then(checkStatus);
};

export const searchRooms = (search) => {
  return fetch(`${base}?q=${search}`)
    .then(checkStatus);
};

export const searchAllRooms = (search) => {
  return fetch(`${base}/all?q=${search}`)
    .then(checkStatus);
};

export const getRoomById = (id) => {
  return fetch(`${base}/${id}`)
    .then(checkStatus);
};

export default {
  getRooms,
  searchRooms,
  getRoomById,
  searchAllRooms
};
