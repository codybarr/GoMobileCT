import React from 'react';
import { Link, browserHistory } from 'react-router';


export default class Admin extends React.Component {

  render() {
    return (
      <div class="Admin">
        <h2>Admin</h2>
        {this.props.children}
      </div>
    );
  }
}
