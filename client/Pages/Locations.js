import React from 'react';

import MapContainer from '../components/MapContainer';

export default class Locations extends React.Component {

  render() {
    return (
      <div class="locations">
        <h1>Locations</h1>
        <MapContainer />
      </div>
    );
  }
}
