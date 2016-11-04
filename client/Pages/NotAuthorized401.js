import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class NotAuthorized401 extends Component {

  render() {
    return (
      <div>
        <h2>401 - Not Authorized</h2>
        <p>You need to <Link to="/user/login">Login</Link> in order to access this page</p>
      </div>
    )
  }
}
