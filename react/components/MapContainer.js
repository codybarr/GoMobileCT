// Based on code at https://www.codementor.io/reactjs/tutorial/integrate-google-maps-api-react-refs

import React from 'react';
import InfoWindow from './InfoWindow';

const ICON = {
  active: '/images/ic_directions_bus_black_36px_blue.svg',
  inactive: '/images/ic_directions_bus_black_36px.svg'
};

export default class MapContainer extends React.Component {
  constructor() {
    super();

    // TODO: Query this data from the api
    // this.state = {
    //   locations: [
    //     { name: 'Empire State Building', location: { lat: 40.748441, lng: -73.985664 } }
    //   ]
    // };
    this.state = {
      info: {},
      events: [],
      locations: []
    };

    this._markers = [];
  }

  componentDidMount() {

    // Creates the map
    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: 41.5019391, lng: -73.0370646 },
      zoom: 11,
      scrollwheel: false
    });

    // Repositions the map to fit all of Connecticut
    this.map.fitBounds(new google.maps.LatLngBounds({lat: 41.004192, lng: -73.733368}, {lat: 42.014037, lng: -71.777802}));

    //google.maps.event.addListenerOnce(this.map, 'tilesloaded', ::this._updateLocations);
    $.ajax({
      method: 'GET',
      url: '/api/locations',
      success: (data) => {
        // this.state.locations = this.state.locations || [];
        // var locations = data.locations.filter((location) => {
        //   return this.state.locations.map((local) => local.name).indexOf(location.name) === -1;
        // });

        this.setState({ locations: data.locations });
        this._addMarkers();
      }
    });

  }

  _addMarkers() {
    this.state.locations.forEach(::this._addMarker);

    console.log(this._markers);
  }

  _addMarker(location, index, array) {
    var marker = new google.maps.Marker({
      position: location.latlng,
      title: location.name,
      icon: ICON.inactive,
      map: this.map
    });
    marker.addListener('click', () => {
      this._lookupEvents(location, marker);
      this._updateIcons(marker);
    });
    this._markers.push(marker);
  }

  _lookupEvents(location) {
    $.ajax({
      method: 'GET',
      url: `/api/events/${location._id}`,
      success: (data) => {
        this.setState({ info: location, events: data.events });
      }
    });
  }

  _updateIcons(marker) {
    this._markers.forEach((currentMarker, index, array) => {
      if (currentMarker === marker) {
        currentMarker.setIcon(ICON.active);
      } else {
        currentMarker.setIcon(ICON.inactive);
      }
    });
  }

  render() {
    const style = {
      height: 400
    }

    return (
      <div class="row">
        <div class="col-md-8">
          <div ref="map" style={style}>
            Loading Map...
          </div>
        </div>
        <div class="col-md-4">
          <InfoWindow info={this.state.info} events={this.state.events}/>
        </div>
      </div>
    );
  }
}
