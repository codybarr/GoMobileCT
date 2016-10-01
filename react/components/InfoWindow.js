import React from 'react';

export default class InfoWindow extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { name, latlng, description } = this.props.info;
    const { lat , lng } = latlng || '';

    let location;
    if (lat && lng) {
      location = <p>Latitude: {lat}, Longitude: {lng}</p>;
    }

    return (
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">{name || 'No Location Selected'}</h3>
        </div>
        <div class="panel-body">
          {location}
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
