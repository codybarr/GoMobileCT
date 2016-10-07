import React from 'react';
import { Link } from 'react-router';

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
      url: `/api/event/${event._id}`
    });

    const events = [...this.state.events];
    const eventIndex = events.indexOf(event);
    events.splice(eventIndex, 1);

    this.setState({ events })
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
        <Link to='/admin/add/event' class='btn btn-success'>Add Event</Link>
      </div>
    );
  }
}
