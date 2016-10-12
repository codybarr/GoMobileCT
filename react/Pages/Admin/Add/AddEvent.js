import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

import EventForm from '../../../components/Admin/EventForm';

export default class AddEvent extends React.Component {

  constructor() {
    super();

    this.state = {
      locations: [],
      event: {
        location: {
          _id: "",
          name: ""
        },
        startDateTime: moment().format(),
        endDateTime: moment().add(2, 'hours').format()
      }
    }
  }

  // Fetch Location Names and Ids
  _fetchLocations() {

  }

  _handleSubmit(newEvent) {

    // Add Event
    $.ajax({
      async: true,
      method: 'POST',
      contentType: "application/json",
      url: '/api/event/add',
      data: JSON.stringify(newEvent),
      success: (data) => {
        // Route the user back to the admin locations page
        browserHistory.push('/admin/events');
      }
    });

  }

  render() {
    return (
      <div class="addEvent">
        <EventForm title='Add' event={this.state.event} submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
