'use strict';

import {pick, assign} from 'lodash';

export default (data, values, extend) => {

  data = pick(data, values);

  if(extend){
    data = assign(data, extend);
  }

  let fd = new FormData();
  for(let key in data){
    fd.append(key, data[key]);
  }

  return fd;

};
