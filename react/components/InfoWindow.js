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
      <div class="info-window">
        <h2>{name || 'No Location Selected'}</h2>
        {location}
        <p>{description}</p>
      </div>
    );
  }
}
