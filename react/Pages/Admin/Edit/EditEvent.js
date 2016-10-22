import React from 'react';
import { browserHistory } from 'react-router';

import moment from 'moment';

import EventForm from '../../../components/Admin/EventForm';

export default class EditEvent extends React.Component {

  constructor() {
    super();

    this.state = {
      locations: [],
      event: {
        location: {
          _id: "",
          name: ""
        },
        startDateTime: moment(Date.now()).format(),
        endDateTime: moment(Date.now()).add(2, 'hours').format()
      }
    }
  }

  componentDidMount() {
    this._fetchEvent();
  }

  // Fetches the event if an eventid is set.
  _fetchEvent() {
    // ajax call to set the event state
    $.ajax({
      async: true,
      method: 'GET',
      url: `/api/event/${this.props.params.id}`,
      success: (data) => {
        this.setState({ event: data.event });
      }
    })
  }

  _handleSubmit(newEvent) {

    // Add Event
    $.ajax({
      async: true,
      method: 'PUT',
      contentType: "application/json",
      url: `/api/event/edit/${this.props.params.id}`,
      headers: { 'Authorization': localStorage.getItem('token') },
      data: JSON.stringify(newEvent),
      success: (data) => {
        // Route the user back to the admin locations page
        browserHistory.push('/admin/events');
      }
    });

  }

  render() {
    return (
      <div class="editEvent">
        <EventForm title='Edit' event={this.state.event} submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
