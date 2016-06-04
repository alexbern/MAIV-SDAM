'use strict';

import React from 'react';
import Emiter from '../events/';

export default (props) => {

  let {name, id} = props;

  const vote = () =>{
    Emiter.emit('vote', id);
  };

  return (
      <div>{name}
        <input type='submit' onClick={() => vote()} value='vote'/>
      </div>
    );
};
