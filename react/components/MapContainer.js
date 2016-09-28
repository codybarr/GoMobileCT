// Based on code at https://www.codementor.io/reactjs/tutorial/integrate-google-maps-api-react-refs

import React from 'react';

export default class MapContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [
        {name: 'Empire State Building', location: {lat: 40.748441, lng: -73.985664}},
        {name: 'Statue of Liberty', location: {lat: 40.689249, lng: -74.044500}},
        {name: 'Central Park', location: {lat: 40.771133, lng: -73.974187}}
      ]
    };
  }

  addMarker(location) {

  }

  componentDidMount() {
    const FIRST_LOCATION_POSITION = {
      lat: this.state.locations[0].location.lat,
      lng: this.state.locations[0].location.lng
    }
    console.log(FIRST_LOCATION_POSITION);

    this.map = new google.maps.Map(this.refs.map, {
      center: FIRST_LOCATION_POSITION,
      zoom: 16
    });
  }

  render() {
    const style = {
      height: 400
    }

    return (
      <div style={{width: '100%'}}>
        <div ref="map" style={style} ref="map">
          Loading Map
        </div>
      </div>
    );
  }
}
