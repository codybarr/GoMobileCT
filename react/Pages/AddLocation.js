import React from 'react';

export default class AddLocation extends React.Component {

  render() {
    return (
      <div class="add-location">
        <h2>Add Location</h2>

        <form class="form-horizontal">
          <div class="form-group">
            <label for="locationName" class="col-sm-2 control-label">Location Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="locationName" placeholder="Location Name" />
            </div>
          </div>
          <div class="form-group">
            <label for="geolocation" class="col-sm-2 control-label">Location</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="geolocation" placeholder="Location" />
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-12">
              <button type="submit" class="btn btn-primary">Add Location</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
