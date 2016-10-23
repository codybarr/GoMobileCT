import React from 'react';
import { browserHistory } from 'react-router';

export default class LocationForm extends React.Component {

  constructor() {
    super();

    this.state = {
      showMap: false
    };
  }

  componentDidUpdate() {
    this._setInitialValues();
  }

  _setInitialValues() {

    const { location } = this.props;
    const { name, address, description, latlng } = location;
    const { lat, lng } = latlng;

    this._locationName.value = name;
    this._address.value = address;
    this._lat.value = lat;
    this._lng.value = lng;
    this._description.value = description;
  }

  _codeAddress(event) {
    event.preventDefault();

    // Geocode the address, set hidden lat/lng fields, and show a map
    var address = this._address;
    var geocoder = new google.maps.Geocoder;

    geocoder.geocode( { 'address': address.value}, (results, status) => {
      if (status == 'OK') {

        var location = results[0].geometry.location; // Returns a google.maps.LatLng object
        var latitude = location.lat();
        var longitude = location.lng();

        // set hidden field values
        this._lat.value = latitude;
        this._lng.value = longitude;

        // show the map
        this.map = new google.maps.Map(this.refs.addressmap, {
          center: { lat: latitude, lng: longitude},
          zoom: 11
        });

        // creates a marker on the map for the selected location, uses a drop animation, sweet!
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          title: this._locationName.value,
          animation: google.maps.Animation.DROP,
          map: this.map,
        });

        this.setState({showMap: true});

      } else {
        alert('No Address could be found.');
      }
    });
  }

  render() {
    const mapStyle = {
      height: 400
    }

    const { title } = this.props;

    return (
      <div class="add-location">
        <h2>{title} Location</h2>

        <form class="form-horizontal" onSubmit={::this._handleSubmit}>
          <div class="form-group">
            <label for="locationName" class="col-sm-2 control-label">Location Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="locationName" placeholder="Women's Center of Eastern Connecticut" ref={(locationName) => this._locationName = locationName}/>
            </div>
          </div>
          <div class="form-group">
            <label for="geolocation" class="col-sm-2 control-label">Address</label>
            <div class="col-sm-8">
              <input type="search" class="form-control" id="geolocation" placeholder="968 Main St. Willimantic, CT" ref={(address) => this._address = address}/>
              <input type="hidden" ref={(lat) => this._lat = lat} />
              <input type="hidden" ref={(lng) => this._lng = lng} />
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
              <textarea class="form-control" rows="3" class="form-control" rows="3" id="description" placeholder="Description" ref={(description) => this._description = description}/>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-primary">{title} Location</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    var newLocation = {
      name: this._locationName.value,
      address: this._address.value,
      latlng: {
        lat: this._lat.value,
        lng: this._lng.value
      },
      description: this._description.value
    };


    this.props.submitMethod(newLocation);
  }
}
