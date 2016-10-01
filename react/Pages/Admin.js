import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class Admin extends React.Component {

  render() {
    // TODO: apparently history.isActive is deprecated, see warning and figure out how to do this using context.router instead :(
    const adminLocationsClass = this.props.history.isActive('/admin/locations') ? 'active' : '';
    const adminEventsClass = this.props.history.isActive('/admin/events') ? 'active' : '';
    return (
      <div class="Admin">
        <h2>Admin</h2>

        <div class="panel panel-default">
          <div class="panel-body">
            <ul class="nav nav-pills">
              <li role="presentation" class={adminLocationsClass}><Link to="/admin/locations">Locations</Link></li>
              <li role="presentation" class={adminEventsClass}><Link to="/admin/events">Events</Link></li>
            </ul>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}
