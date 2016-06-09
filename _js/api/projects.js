'use strict';
import fetch from 'isomorphic-fetch';
import {checkStatus, extraBuildBody} from '../util';
import {basename} from '../globals/';
import token from '../auth/token';

let base = `${basename}/api/projects`;

let whitelist = {
  POST: ['image', 'ownerid', 'description', 'shortdesc', 'intro']
};

export const getProjects = () => {
  return fetch(`${base}`)
    .then(checkStatus);
};

export const getProjectById = (id) => {
  return fetch(`${base}/${id}`)
    .then(checkStatus);
};

export const searchProjects = (search) => {
  return fetch(`${base}?q=${search}`)
    .then(checkStatus);
};

export const searchAllRooms = (search) => {
  return fetch(`${base}/all?q=${search}`)
    .then(checkStatus);
};

export const insert = (data) => {
  let method = 'POST';
  let headers = new Headers({ 'x-auth-token': token.get()});
  let body = extraBuildBody(data, whitelist.POST);

  return fetch(base, {method, body, headers})
    .then(checkStatus);
};

export default {
  getProjects,
  getProjectById,
  searchProjects,
  searchAllRooms,
  insert
};
