import React from 'react';
import { browserHistory, Link } from 'react-router';


import AuthStore from '../../stores/AuthStore';
import * as AuthActions from '../../actions/AuthActions';

import AdminNavTabs from '../../components/Admin/AdminNavTabs';
import LocationListItem from '../../components/Admin/LocationListItem';

export default class LocationList extends React.Component {
  constructor() {
    super();

    this.state = {
      locations: []
    };
  }

  componentWillMount() {
    this._fetchLocations();
  }

  _fetchLocations() {
    $.ajax({
      method: 'GET',
      url: '/api/locations',
      success: (data) => {
        this.setState({ locations: data.locations });
      }
    });
  }

  _deleteLocation(location) {
    // delete the location
    $.ajax({
      method: 'DELETE',
      url: `/api/location/${location._id}`,
      headers: { 'Authorization': AuthStore.getToken() },
      success: (data) => {
        this._deleteRelatedEvents(location);
      },
      error: (xhr) => {
        if (xhr.status == 401) {
          AuthActions.logout();
          browserHistory.push({
            pathname: '/user/login',
            state: {
              error: 'Your session has expired, please login again'
            }
          });
        } else {
          console.log(xhr.responseJSON.errors);
          this.setState({ errors: xhr.responseJSON.errors });
        }
      }
    });
  }

  _deleteRelatedEvents(location) {
    // delete all events associated with the location
    $.ajax({
      method: 'DELETE',
      contentType: 'application/json',
      url: '/api/event',
      headers: { 'Authorization': AuthStore.getToken() },
      data: JSON.stringify({ locationId: location._id }),
      error: (xhr) => {
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
          console.log(xhr.responseJSON.errors);
          this.setState({ errors: xhr.responseJSON.errors });
        }
      }
    });

    const locations = [...this.state.locations];
    const locationIndex = locations.indexOf(location);
    locations.splice(locationIndex, 1);

    this.setState({ locations })
  }

  _getLocations() {
    return this.state.locations.map( (location, index) => {
      return (
        <LocationListItem
          key={location._id}
          index={index + 1}
          location={location}
          onDelete={::this._deleteLocation} />
      );
    });
  }

  _getAlert() {
    const { location } = this.props;

    if (location.state && location.state.alert) {
      return (
        <p class="alert alert-warning">{location.state.alert}</p>
      );
    } else {
      return null;
    }
  }


  render() {
    const locations = this._getLocations();
    const alert = this._getAlert();

    return (
      <div class="LocationList">
        {alert}
        <div class="panel panel-default">
          <AdminNavTabs active='location' />
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Location Name</th>
                <th>Description</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations}
            </tbody>
          </table>
        </div>
        <Link to='/admin/add/location' class='btn btn-success'>Add Location</Link>
      </div>
    );
  }
}
