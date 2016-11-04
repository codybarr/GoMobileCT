import React from 'react';
import { browserHistory } from 'react-router';

import AuthStore from '../../../stores/AuthStore';

import LocationForm from '../../../components/Admin/LocationForm';

export default class AddLocation extends React.Component {

  constructor() {
    super();

    this.state = {
      location: {
        name: '',
        address: '',
        latlng: {
          lat: '',
          lng: ''
        },
        description: ''
      },
      errors: false
    }
  }

  _handleSubmit(newLocation) {
    // When form is submitted:
    // Post the data to the database

    console.log('New Location', newLocation);


    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      url: '/api/location/add',
      headers: { 'Authorization': AuthStore.getToken() },
      data: JSON.stringify(newLocation),
      success: (data) => {
        // Route the user back to the admin locations page
        browserHistory.push('/admin/locations');
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
          this.setState({ errors: xhr.responseJSON.errors });
        }
      }
    });
  }

  render() {
    return (
      <div class="addLocation">
        <LocationForm title='Add' location={this.state.location} errors={this.state.errors} submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
