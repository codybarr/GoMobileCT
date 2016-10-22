import React from 'react';
import { browserHistory } from 'react-router';

export default class EditLocation extends React.Component {

  constructor() {
    super();

    this.state = {
      location: {},
      showMap: false
    };
  }

  componentWillMount() {
    this._fetchLocation();
  }

  componentDidUpdate() {
    this._loadInitialValues();
  }

  _loadInitialValues() {
    const { locationNameInput, addressInput, latInput, lngInput, descriptionInput } = this.refs;

    const { location } = this.state;
    const { name, address, description, latlng } = location;
    const { lat, lng } = latlng;

    locationNameInput.value = name;
    addressInput.value = address;
    latInput.value = lat;
    lngInput.value = lng;
    descriptionInput.value = description;
  }

  _fetchLocation() {
    $.ajax({
      method: 'GET',
      url: '/api/location/' + this.props.params.id,
      success: (data) => {
        this.setState({ location: data.location });
      }
    });
  }

  render() {
    const mapStyle = {
      height: 400
    }

    return (
      <div class="editLocation">
        <h2>Edit Location {name}</h2>

        <form class="form-horizontal" onSubmit={::this._handleSubmit}>
          <div class="form-group">
            <label for="locationName" class="col-sm-2 control-label">Location Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="locationName" placeholder="Location Name" ref="locationNameInput"/>
            </div>
          </div>
          <div class="form-group">
            <label for="geolocation" class="col-sm-2 control-label">Address</label>
            <div class="col-sm-8">
              <input type="search" ref="addressInput" class="form-control" id="geolocation" placeholder="Address"/>
              <input type="hidden" ref="latInput"/>
              <input type="hidden" ref="lngInput"/>
            </div>
            <div class="col-sm-2">
              <button type="submit" class="btn btn-default" onClick={::this._codeAddress}>Search</button>
            </div>
          </div>

          <div class="form-group">
            <div style={this.state.showMap ? mapStyle : {}} ref="addressmap" class="col-sm-8 col-sm-offset-2">
            </div>
          </div>

          <div class="form-group">
            <label for="description" class="col-sm-2 control-label col-form-label">Description</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="3" class="form-control" rows="3" id="description" placeholder="Description" ref="descriptionInput"/>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-primary">Update Location</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    const { locationNameInput, latInput, lngInput, descriptionInput, addressInput } = this.refs;

    var newLocation = {
      name: locationNameInput.value,
      address: addressInput.value,
      latlng: {
        lat: latInput.value,
        lng: lngInput.value
      },
      description: descriptionInput.value
    };

    // When form is submitted:
    // Post the data to the database
    $.ajax({
      async: true,
      method: 'PUT',
      contentType: "application/json",
      url: `/api/location/edit/${this.state.location._id}`,
      headers: { 'Authorization': localStorage.getItem('token') },
      data: JSON.stringify(newLocation),
      success: (data) => {
        // Route the user back to the admin locations page
        browserHistory.push('/admin/locations');
      }
    });
  }

  _codeAddress(event) {
    event.preventDefault();

    // Geocode the address, set hidden lat/lng fields, and show a map
    const { addressInput, latInput, lngInput, addressmap, locationNameInput } = this.refs;

    var geocoder = new google.maps.Geocoder;
    geocoder.geocode( { 'address': addressInput.value}, (results, status) => {
      if (status == 'OK') {
        this.setState({showMap: true});

        var location = results[0].geometry.location; // Returns a google.maps.LatLng object
        var latitude = location.lat();
        var longitude = location.lng();

        // set hidden field values
        latInput.value = latitude;
        lngInput.value = longitude;

        // show the map
        this.map = new google.maps.Map(addressmap, {
          center: { lat: latitude, lng: longitude},
          zoom: 11
        });

        // creates a marker on the map for the selected location, uses a drop animation, sweet!
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          title: locationNameInput.value,
          animation: google.maps.Animation.DROP,
          map: this.map,
        });

      } else {
        alert('No Address could be found.');
      }
    });
  }
}
