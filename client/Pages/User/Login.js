import React from 'react';
import { browserHistory } from 'react-router';

import AuthStore from '../../stores/AuthStore';
import * as AuthActions from '../../actions/AuthActions';

export default class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      error: ''
    }
  }

  _getError() {
    // checks this.props.location.state.error (redirected to this page when trying to access a protected route)
    const { location } = this.props;

    if (location.state && location.state.error) {
      return (
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-2">
            <p class="alert alert-danger">{location.state.error}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  _handleSubmit(e) {
    e.preventDefault();

    AuthActions.login(this._email.value, this._password.value, (error) => {

      if (error == 401) {
        this._email.value = '';
        this._password.value = '';
        browserHistory.push({
          pathname: '/user/login',
          state: { error: 'Invalid username or email. Please try again' }
        });
      } else {
        // Successful Login!
        browserHistory.push('/admin');
      }
    });
  }

  render() {
    const error = this._getError();

    return (
      <div>
        <h2>Login</h2>

        <form class="form-horizontal" onSubmit={::this._handleSubmit}>
          {error}

          <div class="form-group">
            <label class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <input type="text" class="form-control email" placeholder="email" ref={(email) => this._email = email}/>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control password" placeholder="Password" ref={(password) => this._password = password}/>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-raised btn-primary">Login</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}
