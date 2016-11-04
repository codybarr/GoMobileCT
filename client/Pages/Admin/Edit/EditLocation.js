import React from 'react';
import { browserHistory } from 'react-router';

import AuthStore from '../../../stores/AuthStore';
import * as AuthActions from '../../../actions/AuthActions';

import LocationForm from '../../../components/Admin/LocationForm';

export default class EditLocation extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: false
    }
  }

  componentWillMount() {
    this.setState({location: this.props.location.state.location});
  }

  componentDidMount() {
    // this._fetchLocation();
  }

  _fetchLocation() {
    // $.ajax({
    //   method: 'GET',
    //   url: '/api/location/' + this.props.params.id,
    //   success: (data) => {
    //     this.setState({ location: data.location });
    //   }
    // });
  }

  _handleSubmit(newLocation) {
    // When form is submitted:
    // Post the data to the database

    newLocation._id = this.state.location._id;
    console.log('Updated Location', newLocation);

    $.ajax({
      method: 'PUT',
      contentType: "application/json",
      url: `/api/location/edit/${this.state.location._id}`,
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
      <div class="editLocation">
        <LocationForm title='Edit' location={this.state.location} errors={this.state.errors} submitMethod={::this._handleSubmit}/>
      </div>
    );
  }
}
