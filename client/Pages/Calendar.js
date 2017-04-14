import React from 'react';
import moment from 'moment';

import axios from 'axios';

require('../public/stylesheets/calendar.scss');

export default class Calendar extends React.Component {

  constructor() {
    super();

    this.WEEKDAYS = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ];

    this.directionsUrl = `https://maps.google.com/maps?daddr=`;

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this._updateDateEvents();
  }

  _updateDateEvents() {

    axios.get(`/api/events`)
      .then( (response) => {
        this.setState({ events: response.data.events });
      });
  }

  _getDayEvents(day) {
      return this.state.events.filter( (event) => {
        return event.dayOfWeek === day;
      }).map( (event) => {
        return (
            <div class="panel panel-info" key={event._id}>
              <div class="panel-heading"><h3 class="panel-title">{event.location.name}</h3></div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-md-4">
                    <strong>Address:</strong>
                  </div>
                  <div class="col-md-8">
                    <a href={this.directionsUrl + event.location.address}>{event.location.address}</a>
                  </div>
                </div>
                <br/>
                <div class="row">
                  <div class="col-md-4">
                    <strong>Time:</strong>
                  </div>
                  <div class="col-md-8">
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
              </div>
            </div>
        );
      });
  }

  _getEvents() {
    let events = [];

    if (this.state.events && this.state.events.length) {

      // iterate over the days in the week
      for (let day of this.WEEKDAYS) {
        events.push(
            <div class="day" key={day}>
              <h3>{ day }</h3>
              { this._getDayEvents(day) }
            </div>
        );
      }

      return events;

    } else {
      return null;
    }
  }

  render() {
    const events = this._getEvents(this.state.currentDate);

    return (
      <div class="calendar">
        <h1>Calendar</h1>

        <div class="week-events">
          { events }
        </div>

      </div>
    );
  }

}
