import React from 'react';
import { browserHistory } from 'react-router';

import LocationForm from '../../../components/Admin/LocationForm';

export default class EditLocation extends React.Component {

  constructor() {
    super();

    this.state = {
      location: {}
    };
  }

  componentDidMount() {
    this._fetchLocation();
  }

  _fetchLocation() {
    $.ajax({
      method: 'GET',
      url: '/api/location/' + this.props.params.id,
      success: (data) => {
        this.setState({ location: data.location });
      }
    });
  }

  _handleSubmit(newLocation) {
    event.preventDefault();

    // When form is submitted:
    // Post the data to the database
    $.ajax({
      async: true,
      method: 'PUT',
      contentType: "application/json",
      url: `/api/location/edit/${this.state.location._id}`,
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
      <div class="editLocation">
        <LocationForm title='Edit' location={this.state.location} submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
