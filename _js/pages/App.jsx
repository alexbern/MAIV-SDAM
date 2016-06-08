'use strict';

import React from 'react';

export default class App extends React.Component{
  constructor(props, context) {
    super(props, context);
  }
  render() {

    let {children} = this.props;

    return (
        <div>
        {children}
        </div>
    );
  }
}
