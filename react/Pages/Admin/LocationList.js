import React from 'react';
import { Link } from 'react-router';

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
    $.ajax({
      method: 'DELETE',
      url: `/api/location/${location._id}`
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


  render() {
    const locations = this._getLocations();

    return (
      <div class="LocationList">
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
