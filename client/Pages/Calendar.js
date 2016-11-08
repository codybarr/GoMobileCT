import React from 'react';
import moment from 'moment';

import axios from 'axios';

require('../public/stylesheets/calendar.scss');

export default class Calendar extends React.Component {

  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    axios.get('/api/events')
      .then( (response) => {
        this.setState({ events: response.data.events});
      });
  }

  componentDidUpdate() {

  }

  _daysEvents(day) {
    return
  }

  _getEvents() {

    let startOfWeek = moment(new Date).startOf('week');
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
            <div class="panel panel-primary" key={event._id}>
              <div class="panel-heading"><h3 class="panel-title">{event.location.name}</h3></div>
              <div class="panel-body">
                {moment(event.startDateTime).format('h:mm a')} - {moment(event.endDateTime).format('h:mm a')}
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
    
    const today = moment(new Date);
    const startOfWeek = today.clone().startOf('week');
    const dateFormat = 'M/D';
    const weekdayFormat = 'ddd';

    const events = this._getEvents();

    return (
      <div class="calendar">
        <h2>Calendar</h2>

        <div>
          <table class="table">
            <thead>
              <tr>
                <th class={`day sunday ${today.format('dddd') === 'Sunday' && 'active'}`}>{startOfWeek.format(dateFormat)}<br/>{startOfWeek.format(weekdayFormat)}</th>
                <th class={`day monday ${today.format('dddd') === 'Monday' && 'active'}`}>{startOfWeek.clone().add(1, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(1, 'days').format(weekdayFormat)}</th>
                <th class={`day tuesday ${today.format('dddd') === 'Tuesday' && 'active'}`}>{startOfWeek.clone().add(2, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(2, 'days').format(weekdayFormat)}</th>
                <th class={`day wednesday ${today.format('dddd') === 'Wednesday' && 'active'}`}>{startOfWeek.clone().add(3, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(3, 'days').format(weekdayFormat)}</th>
                <th class={`day thursday ${today.format('dddd') === 'Thursday' && 'active'}`}>{startOfWeek.clone().add(4, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(4, 'days').format(weekdayFormat)}</th>
                <th class={`day friday ${today.format('dddd') === 'Friday' && 'active'}`}>{startOfWeek.clone().add(5, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(5, 'days').format(weekdayFormat)}</th>
                <th class={`day saturday {today.format('dddd') === 'Saturday' && 'active'}`}>{startOfWeek.clone().add(6, 'days').format(dateFormat)}<br/>{startOfWeek.clone().add(6, 'days').format(weekdayFormat)}</th>
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
}
