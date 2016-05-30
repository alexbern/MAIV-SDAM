'use strict';

export default role => {
  role = parseInt(role);
  if(role === 0) return 'user';
  if(role === 1) return 'admin';
};
