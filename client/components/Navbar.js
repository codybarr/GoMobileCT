import React from 'react';
import { Link, browserHistory } from 'react-router';

import AuthStore from '../stores/AuthStore';
import * as AuthActions from '../actions/AuthActions';

export default class Navbar extends React.Component {

  constructor() {
    super();
    this.getAuth = this.getAuth.bind(this);

    this.state = {
      loggedIn: AuthStore.loggedIn(),
      user: AuthStore.getUser()
    };
  }

  getAuth() {
    this.setState({
      loggedIn: AuthStore.loggedIn(),
      user: AuthStore.getUser()
    });
  }

  componentWillMount() {
    AuthStore.on("change", this.getAuth);
  }

  componentWillUnmount() {
    AuthStore.removeListener("change", this.getAuth);
  }


  _handleLogout(e) {
    e.preventDefault();

    AuthActions.logout();
  }

  _getUserActions() {
    if (!this.state.loggedIn) {
      return (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to='/user/login'>Login</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.user.email} <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><Link to='/admin'>Admin</Link></li>
              <li><Link to='/user/logout' onClick={::this._handleLogout}>Logout</Link></li>
            </ul>
          </li>
        </ul>
      );
    }
  }

  render() {
    const userActions = this._getUserActions();

    return (
      <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">

          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <Link class="navbar-brand" to='/'>GoMobileCT</Link>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li>
                <Link to='/locations'>Map / Locations</Link>
              </li>
              <li>
                <Link to='/calendar'>Calendar</Link>
              </li>
              <li>
                <Link to='/calculator'>Pregnancy Calculator</Link>
              </li>
            </ul>

            {userActions}
          </div>
        </div>
      </nav>
    );
  }
}
