// 'use strict';
//
// import {pick, assign} from 'lodash';
//
// export default (data, values, extra) => {
//   data = pick(data, values);
//   if(extra){
//     data = assign(data, extra);
//   }
//   return JSON.stringify(data);
// };

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

  return JSON.stringify(data);

};
