import React from 'react';
import { browserHistory } from 'react-router';

import LocationForm from '../../../components/Admin/LocationForm';

export default class AddLocation extends React.Component {

  constructor() {
    super();

    this.state = {
      location: {}
    }
  }

  _handleSubmit(newLocation) {
    // When form is submitted:
    // Post the data to the database
    $.ajax({
      async: true,
      method: 'POST',
      contentType: "application/json",
      url: '/api/location/add',
      headers: { 'Authorization': localStorage.getItem('token') },
      data: JSON.stringify(newLocation),
      success: (data) => {
        // Route the user back to the admin locations page
        browserHistory.push('/admin/locations');
      }
    });
  }

  render() {
    return (
      <div class="addLocation">
        <LocationForm title='Add' location={this.state.location} submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
