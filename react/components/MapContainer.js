// Based on code at https://www.codementor.io/reactjs/tutorial/integrate-google-maps-api-react-refs

import React from 'react';

export default class MapContainer extends React.Component {
  constructor() {
    super();

    // TODO: Query this data from the api
    // this.state = {
    //   locations: [
    //     { name: 'Empire State Building', location: { lat: 40.748441, lng: -73.985664 } }
    //   ]
    // };
  }

  componentDidMount() {
    // const FIRST_LOCATION_POSITION = {
    //   lat: this.state.locations[0].location.lat,
    //   lng: this.state.locations[0].location.lng
    // }
    // console.log(FIRST_LOCATION_POSITION);

    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: 40.748441, lng: -73.985664 },
      zoom: 11
    });

    //google.maps.event.addListenerOnce(this.map, 'tilesloaded', ::this._updateLocations);
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/api/locations',
      success: (data) => {
        // this.state.locations = this.state.locations || [];
        // var locations = data.locations.filter((location) => {
        //   return this.state.locations.map((local) => local.name).indexOf(location.name) === -1;
        // });

        this.setState({ locations: data.locations });
      }
    });

  }

  _updateLocations() {
    this.state.locations.forEach(::this._addMarker);
  }

  _addMarker(location, index, array) {
    console.log(location.latlng);
    new google.maps.Marker({
      position: location.latlng,
      map: this.map
    });
  }

  componentDidUpdate(prevProps, prevState) {
    var check = [];
    var check = prevState ? prevState.locations || check : check;
    if (this.state.locations || this.state.locations !== check) {
      this.state.locations.forEach(::this._addMarker);
      console.log("changed state");
    }
  }

  render() {
    const style = {
      height: 400
    }

    return (
      <div style={{ width: '100%' }}>
        <div ref="map" style={style} ref="map">
          Loading Map
        </div>
      </div>
    );
  }
}
