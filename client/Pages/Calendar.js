import React from 'react';
import moment from 'moment';

import axios from 'axios';

require('../public/stylesheets/calendar.scss');

export default class Calendar extends React.Component {

  constructor() {
    super();

    this.directionsUrl = `https://maps.google.com/maps?daddr=`;

    this.state = {
      events: [],
      currentDate: moment(new Date)
    };
  }

  componentDidMount() {
    this._updateDateEvents(moment(new Date));
  }

  // componentWillUpdate() {
  //   this._updateDateEvents();
  // }

  // componentDidUpdate() {
  //   this._updateDateEvents();
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // return !this.state.currentDate.isSame(nextState.currentDate, 'day');
  //   return this.state.events !== nextState.events;
  // }

  _updateDateEvents(newDate) {

    axios.get(`/api/events/week/${newDate.format('YYYY-MM-DD')}`)
      .then( (response) => {
        this.setState({ events: response.data.events, currentDate: newDate});
      });
  }

  _getTableHeaders(currentDate) {
    // <th class={`day sunday ${today.isSame(startOfWeek, 'day') && 'active'}`}>{startOfWeek.format(dateFormat)}<br/>{startOfWeek.format(weekdayFormat)}</th>
    // <th class={`day monday ${today.format('dddd') === 'Monday' && 'active'}`}>{startOfWeek.clone().add(1, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(1, 'days').format(weekdayFormat)}</th>
    // <th class={`day tuesday ${today.format('dddd') === 'Tuesday' && 'active'}`}>{startOfWeek.clone().add(2, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(2, 'days').format(weekdayFormat)}</th>
    // <th class={`day wednesday ${today.format('dddd') === 'Wednesday' && 'active'}`}>{startOfWeek.clone().add(3, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(3, 'days').format(weekdayFormat)}</th>
    // <th class={`day thursday ${today.format('dddd') === 'Thursday' && 'active'}`}>{startOfWeek.clone().add(4, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(4, 'days').format(weekdayFormat)}</th>
    // <th class={`day friday ${today.format('dddd') === 'Friday' && 'active'}`}>{startOfWeek.clone().add(5, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(5, 'days').format(weekdayFormat)}</th>
    // <th class={`day saturday {today.format('dddd') === 'Saturday' && 'active'}`}>{startOfWeek.clone().add(6, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(6, 'days').format(weekdayFormat)}</th>

    const dateFormat = 'M/D';
    const weekdayFormat = 'ddd';

    let headers = [];
    let today = moment(new Date);
    let startOfWeek = currentDate.startOf('week');
    let day;

    for (var i = 0; i < 7; i++) {
      day = startOfWeek.clone().add(i, 'days');

      headers.push(
        <th key={i} class={`day ${day.format('dddd').toLowerCase} ${today.isSame(day, 'day') && 'active'}`}>{day.format(dateFormat)}<br/>{day.format(weekdayFormat)}</th>
      );
    }

    console.log('headers', headers);
    return headers;
  }

  _getEvents(currentDate) {

    let startOfWeek = currentDate.startOf('week');
    let weeksEvents = {
      'Sunday': [],
      'Monday': [],
      'Tuesday': [],
      'Wednesday': [],
      'Thursday': [],
      'Friday': [],
      'Saturday': []
    };
    let events = [];

    if (this.state.events && this.state.events.length) {

      this.state.events.forEach( (event, index) => {
        weeksEvents[moment(event.startDateTime).format('dddd')].push(event);
      });

      console.log('days object', weeksEvents);

      for (var day in weeksEvents) { // iterate over new weeksEvents object
        let daysEvents = weeksEvents[day].map( (event) => {
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
                   {moment(event.startDateTime).format('h:mm a')} - {moment(event.endDateTime).format('h:mm a')}
                  </div>
                </div>
              </div>
            </div>
          );
        });

        console.log(weeksEvents[day]);

        events.push(
            <td key={day} class={day}>
              { daysEvents }
            </td>
        );
      }

      return events;

    } else {
      return null;
    }
  }

  render() {
    const tableHeaders = this._getTableHeaders(this.state.currentDate);
    const events = this._getEvents(this.state.currentDate);

    return (
      <div class="calendar">
        <h1>Calendar</h1>

        <nav aria-label="week-controls">
          <ul class="pager">
            <li class="previous"><a href="#" onClick={::this._previousWeek}><span aria-hidden="true">&larr;</span> Previous Week</a></li>
            <li class="next"><a href="#" onClick={::this._nextWeek}>Next Week <span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                {tableHeaders}
              </tr>
            </thead>
            <tbody>
              <tr>
                {events}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  _nextWeek() {
    this._updateDateEvents(this.state.currentDate.clone().add(1, 'week'))
    // this.setState({currentDate: this.state.currentDate.add(1, 'week')});
  }

  _previousWeek() {
    this._updateDateEvents(this.state.currentDate.clone().subtract(1, 'week'))
  }

}
