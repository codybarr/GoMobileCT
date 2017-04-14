import React from 'react';
import { browserHistory } from 'react-router';

import AuthStore from '../../../stores/AuthStore';
import * as AuthActions from '../../../actions/AuthActions';

import EventForm from '../../../components/Admin/EventForm';

export default class AddEvent extends React.Component {

  constructor() {
    super();

    this.state = {
      locations: [],
      event: {
        location: {
          _id: '',
          name: ''
        },
        startTime: '',
        endTime: ''
      },
      errors: false
    }
  }

  _handleSubmit(newEvent) {

    // Add Event
    $.ajax({
      method: 'POST',
      contentType: "application/json",
      url: '/api/event/add',
      headers: { 'Authorization': AuthStore.getToken() },
      data: JSON.stringify(newEvent),
      success: (data) => {
        // Route the user back to the admin locations page
        browserHistory.push('/admin/events');
      },
      error: (xhr, message, error) => {
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
          this.setState({ errors: xhr.responseJSON.errors});
        }
      }
    });

  }

  render() {
    return (
      <div class="addEvent">
        <EventForm title='Add' event={this.state.event} errors={this.state.errors} submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
