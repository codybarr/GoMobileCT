import React from 'react';
import { browserHistory } from 'react-router';

export default class AddLocation extends React.Component {

  constructor() {
    super();

    this.state = {
      showMap: false
    };
  }

  _codeAddress(event) {
    event.preventDefault();

    // Geocode the address, set hidden lat/lng fields, and show a map
    var address = this.refs.address;
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode( { 'address': address.value}, (results, status) => {
      if (status == 'OK') {
        this.setState({showMap: true});
        var location = results[0].geometry.location; // Returns a google.maps.LatLng object
        var latitude = location.lat();
        var longitude = location.lng();

        // set hidden field values
        this.refs.lat.value = latitude;
        this.refs.lng.value = longitude;

        // show the map
        this.map = new google.maps.Map(this.refs.addressmap, {
          center: { lat: latitude, lng: longitude},
          zoom: 11
        });

        // creates a marker on the map for the selected location, uses a drop animation, sweet!
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          title: this.refs.locationName.value,
          animation: google.maps.Animation.DROP,
          map: this.map,
        });

      } else {
        alert('No Address could be found.');
      }
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    // Gather fields into the newLocation object
    var newLocation = {
      name: this.refs.locationName.value,
      latlng: {
        lat: this.refs.lat.value,
        lng: this.refs.lng.value
      },
      description: this.refs.description.value
    };


    // When form is submitted:
    // Post the data to the database
    $.ajax({
      async: true,
      method: 'POST',
      contentType: "application/json",
      url: '/api/location/add',
      data: JSON.stringify(newLocation),
      success: (data) => {
        // Route the user back to the admin locations page
        browserHistory.push('/admin/locations');
      }
    });
  }

  render() {
    const mapStyle = {
      height: 400
    }

    return (
      <div class="add-location">
        <h2>Add Location</h2>

        <form class="form-horizontal" onSubmit={::this._handleSubmit}>
          <div class="form-group">
            <label for="locationName" class="col-sm-2 control-label">Location Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="locationName" placeholder="Location Name" ref="locationName"/>
            </div>
          </div>
          <div class="form-group">
            <label for="geolocation" class="col-sm-2 control-label">Address</label>
            <div class="col-sm-8">
              <input type="search" ref="address" class="form-control" id="geolocation" placeholder="Address" />
              <input type="hidden" ref="lat" />
              <input type="hidden" ref="lng" />
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
              <textarea class="form-control" rows="3" class="form-control" rows="3" id="description" placeholder="Description" ref="description"/>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-primary">Add Location</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
