'use strict';

export default response => {
  let json = response.json(); // there's always a body
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else {
    return json.then(Promise.reject.bind(Promise));
  }
};
