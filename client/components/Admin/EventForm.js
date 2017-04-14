import React from 'react';

import { Link } from 'react-router';

export default class EventForm extends React.Component {

  constructor() {
    super();

    this.state = {
      locations: []
    }
  }

  componentWillMount() {
    this._fetchLocations();
  }

  componentDidUpdate() {
    $('.timepicker').timepicker({
      timeFormat: 'h:i A'
    });
  }

  // Fetch Location Names and Ids
  _fetchLocations() {
    $.ajax({
      async: true,
      method: 'GET',
      url: '/api/locations/names',
      success: (data) => {
        this.setState( { locations: data.locations });
      }
    });
  }

  _getLocations() {
    return this.state.locations.map((location, index) => {
      return (
        <option key={location._id} value={location._id}>{location.name}</option>
      )
    });
  }

  _getWeekdays() {
    let weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ];
    return weekdays.map((weekday, index) => {
      return (
        <option key={index} value={weekday}>{weekday}</option>
      )
    });
  }



  _getErrors() {

    var errors = [];
    var order = ["location", "startDateTime", "endDateTime"];

    if (this.props.errors) {
      errors = Object.keys(this.props.errors).sort( (a, b) => {
        return order.indexOf(a) - order.indexOf(b);
      }).map( (error) => {
        return (<li key={error}>{this.props.errors[error].message}</li>);
      });

      return (
        <div class="alert alert-danger col-sm-10 col-sm-offset-2">
          <ul>{errors}</ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { title } = this.props;
    const locations = this._getLocations();
    const weekdays = this._getWeekdays();

    const errors = this._getErrors();

    return (
      <div class="eventForm">
        <ul class="breadcrumb" style={{marginBottom: 5}}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><Link to='/admin/events'>Events</Link></li>
        </ul>

        <h2>{title} Event</h2>

        {errors}

        <form class="form-horizontal" onSubmit={::this._handleSubmit}>
          <div class="form-group">
            <label for="locationInput" class="col-sm-2 control-label">Location</label>
            <div class="col-sm-6">
              <select class="form-control" id="locationInput" ref={(location) => this._location = location}>
                <option value=""> - None - </option>
                {locations}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Day of Week</label>
            <div class="col-sm-10">
              <select class="form-control" id="dayOfWeek" ref={(dayOfWeek) => this._dayOfWeek = dayOfWeek}>
                <option value=""></option>
                {weekdays}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Start Time:</label>
            <div class="col-sm-4">
              <input type="text" class="form-control timepicker" id="startTime" ref={(startTime) => this._startTime = startTime}/>
            </div>
            <label class="col-sm-2 control-label">End Time:</label>
            <div class="col-sm-4">
              <input type="text" class="form-control timepicker" id="endTime" ref={(endTime) => this._endTime = endTime}/>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-raised btn-primary">{title} Event</button>
            </div>
          </div>

        </form>
      </div>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    // const dateTimeFormat = 'MM/DD/YYYY hh:mm A';

    let newEvent = {
      location: this._location.value,
      dayOfWeek: this._dayOfWeek.value,
      startTime: this._startTime.value,
      endTime: this._endTime.value
    };

    this.props.submitMethod(newEvent);
  }
}
