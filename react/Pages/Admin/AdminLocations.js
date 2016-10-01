import React from 'react';

import LocationList from '../../components/Admin/LocationList';

export default class AdminLocations extends React.Component {
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


  render() {
    return (
      <LocationList locations={this.state.locations}/>
    );
  }
}
