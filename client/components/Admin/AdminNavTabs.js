import React from 'react';
import { Link } from 'react-router';

export default class AdminNavTabs extends React.Component {
  render() {
    // TODO: apparently history.isActive is deprecated, see warning and figure out how to do this using context.router instead :(
    // const adminLocationsClass = this.props.history.isActive('/admin/locations') ? 'active' : '';
    // const adminEventsClass = this.props.history.isActive('/admin/events') ? 'active' : '';


    return (
      <div class="panel-body">
        <ul class="nav nav-pills">
          <li role="presentation" class={this.props.active === 'location' ? 'active' : ''}><Link to="/admin/locations">Locations</Link></li>
          <li role="presentation" class={this.props.active === 'event' ? 'active' : ''}><Link to="/admin/events">Events</Link></li>
        </ul>
      </div>
    );
  }
}
