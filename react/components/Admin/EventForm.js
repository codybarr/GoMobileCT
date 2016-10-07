import React from 'react';
import moment from 'moment';

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
    this._setInitialValues();
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

  _setInitialValues() {
    const { event } = this.props;
    const dateFormat='YYYY-MM-DD\Thh\:mm';

    this._location.value = event.location._id;
    this._startDate.value = moment(event.startDateTime).format(dateFormat);
    this._endDate.value = moment(event.endDateTime).format(dateFormat);
  }

  render() {
    const { title } = this.props;
    const locations = this._getLocations();

    return (
      <div class="eventForm">
        <h2>{title} Event</h2>

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
            <label for="startDate" class="col-sm-2 control-label">Start Date</label>
            <div class="col-sm-10">
              <input type="datetime-local" class="form-control" id="startDate" placeholder="Start Date" ref={(startDate) => this._startDate = startDate}/>
            </div>
          </div>

          <div class="form-group">
            <label for="endDate" class="col-sm-2 control-label">End Date</label>
            <div class="col-sm-10">
              <input type="datetime-local" class="form-control" id="startDate" placeholder="End Date" ref={(endDate) => this._endDate = endDate}/>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-primary">{title} Event</button>
            </div>
          </div>

        </form>
      </div>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    let newEvent = {
      location: this._location.value,
      startDateTime: moment(this._startDate.value).utc().format(),
      endDateTime: moment(this._endDate.value).utc().format()
    };

    this.props.submitMethod(newEvent);
  }
}
