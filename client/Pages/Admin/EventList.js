import React from 'react';
import { browserHistory, Link } from 'react-router';

import AuthStore from '../../stores/AuthStore';
import * as AuthActions from '../../actions/AuthActions';

import AdminNavTabs from '../../components/Admin/AdminNavTabs';
import EventListItem from '../../components/Admin/EventListItem';

export default class EventList extends React.Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentWillMount() {
    this._fetchEvents();
  }

  _fetchEvents() {
    $.ajax({
      method: 'GET',
      url: '/api/events',
      success: (data) => {
        this.setState({ events: data.events });
      }
    });
  }


  _deleteEvent(event) {
    $.ajax({
      method: 'DELETE',
      url: `/api/event/${event._id}`,
      headers: { 'Authorization': AuthStore.getToken() },
      success: (data) => {
        const events = [...this.state.events];
        const eventIndex = events.indexOf(event);
        events.splice(eventIndex, 1);

        this.setState({ events })
      },
      error: (xhr) => {
        // console.log(xhr.responseJSON);
        if (xhr.status == 401) {
          AuthActions.logout();
          browserHistory.push({
            pathname: '/user/login',
            state: {
              error: 'Your session has expired, please login again'
            }
          });
        } else {
          console.log(xhr.responseJSON.errors);
          this.setState({ errors: xhr.responseJSON.errors });
        }
      }
    });
  }


  // Generates Event List Items from queried array of events
  _getEvents() {
    return this.state.events.map( (event, index) => {
      return (
        <EventListItem
          key={event._id}
          index={index + 1}
          event={event}
          onDelete={::this._deleteEvent} />
      );
    });
  }

  render() {
    const events = this._getEvents();

    return (
      <div class="Event">
        <div class="panel panel-default">
          <AdminNavTabs active='event' />
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Location</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events}
            </tbody>
          </table>
        </div>
        <Link to='/admin/add/event' class='btn btn-raised btn-success'>Add Event</Link>
      </div>
    );
  }
}
