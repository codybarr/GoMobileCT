import React from 'react';
import { browserHistory } from 'react-router';

import moment from 'moment';

import AuthStore from '../../../stores/AuthStore';
import * as AuthActions from '../../../actions/AuthActions';

import EventForm from '../../../components/Admin/EventForm';

export default class EditEvent extends React.Component {

  constructor() {
    super();

    this.state = {
      locations: [],
      event: {
        location: {
          _id: '',
          name: ''
        },
        startDateTime: moment(Date.now()).format(),
        endDateTime: moment(Date.now()).add(2, 'hours').format()
      },
      errors: false
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

    newEvent._id = this.state.event._id;
    console.log('Updated Location', newEvent);

    // Edit Event
    $.ajax({
      method: 'PUT',
      contentType: 'application/json',
      dataType: 'json',
      url: `/api/event/edit/${this.props.params.id}`,
      headers: { 'Authorization': AuthStore.getToken() },
      data: JSON.stringify(newEvent),
      success: (data) => {
        // Route the user back to the admin locations page
        console.log('Success!');
        browserHistory.push('/admin/events');
      },
      error: (error) => {
        console.log('Error', error);
      }
    });

  }

  render() {
    return (
      <div class="editEvent">
        <EventForm title='Edit' event={this.state.event} errors={this.state.errors} submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
