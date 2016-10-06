import React from 'react';
import { browserHistory } from 'react-router';

import EventForm from '../../../components/Admin/EventForm';

export default class AddEvent extends React.Component {

  constructor() {
    super();

    this.state = {
      locations: []
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
        <EventForm title='Add' submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
