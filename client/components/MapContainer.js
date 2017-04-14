// Based on code at https://www.codementor.io/reactjs/tutorial/integrate-google-maps-api-react-refs

import React from 'react';

const ICON = {
  active: '/images/ic_directions_bus_black_36px_material_accent.svg',
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
    this._infoWindows = [];
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
      success: (locationsQuery) => {
        $.ajax({
          method: 'GET',
          url: '/api/events/current',
          success: (eventsQuery) => {
            var locations = locationsQuery.locations.map((location) => {
              location.events = eventsQuery.events.filter((event) => {
                return event.location._id === location._id;
              });
              return location;
            });

            this.setState({ locations: locations });
            this._addMarkers();
          }
        });
      }
    });
  }

  _addMarkers() {
    this.state.locations.forEach(::this._addMarker);
  }

  _addMarker(location, index, array) {
    var marker = new google.maps.Marker({
      position: location.latlng,
      title: location.name,
      icon: ICON.inactive,
      map: this.map
    });

    let schedule = "";

    location.events.forEach( (event) => {
      schedule += `
        <div key=${event.id}>
          <strong>${event.dayOfWeek}</strong> ${event.startTime} - ${event.endTime}
        </div>
      `;
    });

    var infoWindow = new google.maps.InfoWindow({
      content:`
        <div>
          <h3>${location.name}</h3>
          <p>${location.description}</p>
          ${schedule}
        </div>
      `,
      maxWidth: 400
    });
    marker.addListener('click', () => {
      this._setCurrentLocation(location);
      this._updateIcons(marker);
      this.map.panTo(marker.getPosition());
    });
    marker['infoWindow'] = infoWindow;
    this._markers.push(marker);
  }

  _setCurrentLocation(location) {
    this.setState({ currentLocation: location });
  }

  _updateIcons(marker) {
    this._markers.forEach((currentMarker, index, array) => {
      if (currentMarker === marker) {
        currentMarker.setIcon(ICON.active);
        currentMarker.infoWindow.open(this.map, currentMarker);
      } else {
        currentMarker.setIcon(ICON.inactive);
        currentMarker.infoWindow.close();
      }
    });
  }



  render() {
    const style = {
      width: '100%',
      height: '100%'
    };

    return (
      <div class="map-container" style={style}>
        <div id="map-canvas" ref="map" style={style}>
          Loading Map...
        </div>
      </div>
    );
  }
}
