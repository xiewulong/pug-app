/*!
 * App
 * create: 2018/09/19
 * since: 0.0.1
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app.jsx';

export default class {

  constructor(el = '#app') {
    this.el = el;

    this.render();
  }

  render() {
    ReactDOM.render(<App />, document.querySelector(this.el));
  }

}
