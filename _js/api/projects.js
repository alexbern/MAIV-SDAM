'use strict';
import fetch from 'isomorphic-fetch';
import {buildBody, checkStatus} from '../util';
import {basename} from '../globals/';

let base = `${basename}/api/projects`;

export const getProjects = () => {
  return fetch(`${base}`)
    .then(checkStatus);
};

export default {
  getProjects
};
