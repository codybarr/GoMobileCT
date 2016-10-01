import React from 'react';
import LocationListItem from '../../components/Admin/LocationListItem';

export default class LocationList extends React.Component {

  _getLocations() {
    return this.props.locations.map( (location, index) => {
      return (
        <LocationListItem
          key={location._id}
          index={index + 1}
          location={location} />
      );
    });
  }

  render() {
    const locations = this._getLocations();

    return (
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
    );
  }
}
