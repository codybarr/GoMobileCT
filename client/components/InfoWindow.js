import React from 'react';
import moment from 'moment';

export default class InfoWindow extends React.Component {

  constructor() {
    super();
  }

  _getEvents() {
    let events;

    if (this.props.location && this.props.location.events && this.props.location.events.length) {
      events =  this.props.location.events.map( (event, index) => {
        return (
          <li key={event._id}>
            {moment(event.startDateTime).format('MMMM D, YYYY h:mm a')} - {moment(event.endDateTime).format('h:mm a')}
          </li>
        );
      });

      return (
        <div class="panel-body">
          <h3>Upcoming Events</h3>
          <ul>
            {events}
          </ul>
        </div>
      );
    } else {
      return (
        <div class="panel-body">
          <p>No upcoming events</p>
        </div>
      );
    }
  }

  render() {
    const { location } = this.props || {};
    const { name, address, description } = location || {};
    const events = this._getEvents() || [];

    let addressName;
    if (address) {
      addressName = <p><strong>Address:</strong> {address}</p>;
    } else {
      addressName = <p>Please select a location</p>
    }

    return (
      <div class="panel panel-info">
        <div class="panel-heading">
          <h3 class="panel-title">{name || 'No Location Selected'}</h3>
        </div>
        <div class="panel-body">
          {addressName}
          <p>{description}</p>
        </div>
        {events}
      </div>
    );
  }
}
