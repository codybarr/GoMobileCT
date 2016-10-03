import React from 'react';
import { Link } from 'react-router';

import AdminNavTabs from '../../components/Admin/AdminNavTabs';


export default class EventList extends React.Component {

  render() {
    return (
      <div class="Event">
        <div class="panel panel-default">
          <AdminNavTabs active='event' />
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>No Events Yet...</td></tr>
            </tbody>
          </table>
        </div>
        <Link to='/admin/add/event' class='btn btn-success'>Add Event</Link>
      </div>
    );
  }
}
