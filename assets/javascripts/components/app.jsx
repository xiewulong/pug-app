/*!
 * App
 * create: 2018/09/19
 * since: 0.0.1
 */
'use strict';

import React from 'react';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.handle_click = this.handle_click.bind(this);
  }

  componentDidMount() {
    // this.setState({});
    // this.setState((prevState, props) => ({}));
  }

  componentWillUnmount() {

  }

  handle_click() {
    console.log('Click event');
  }

  render() {
    return (
      <div class="app" onClick={this.handle_click}>App</div>
    );
  }

};
