import React from 'react';
import { Link } from 'react-router';

import AuthStore from '../../stores/AuthStore';

export default class AdminNavTabs extends React.Component {

  _getUserAdminMenu() {
    if (AuthStore.isSuperAdmin()) {
      return (
        <li role="presentation" class={this.props.active === 'user' ? 'active' : ''}><Link to="/admin/users">Users</Link></li>
      );
    } else {
      return null;
    }
  }

  render() {
    // TODO: apparently history.isActive is deprecated, see warning and figure out how to do this using context.router instead :(
    // const adminLocationsClass = this.props.history.isActive('/admin/locations') ? 'active' : '';
    // const adminEventsClass = this.props.history.isActive('/admin/events') ? 'active' : '';

    const userAdminMenu = this._getUserAdminMenu();

    return (

      <div class="panel-body">
        <ul class="nav nav-pills">
          <li role="presentation" class={this.props.active === 'location' ? 'active' : ''}><Link to="/admin/locations">Locations</Link></li>
          <li role="presentation" class={this.props.active === 'event' ? 'active' : ''}><Link to="/admin/events">Events</Link></li>
          {userAdminMenu}
        </ul>
      </div>
    );
  }
}
