import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {

  render() {
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

            <ul class="nav navbar-nav navbar-right">
              <li>
                <Link to='/user/login'>Login</Link>
              </li>
              <li>
                <Link to='/admin'>Admin</Link>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Add <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><Link to='/admin/add/location'>Location</Link></li>
                  <li><Link to='/admin/add/event'>Event</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
