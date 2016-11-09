import React from 'react';
import { Link } from 'react-router';

import moment from 'moment';

export default class LocationListItem extends React.Component {

  render() {
    const noWrap = {
      whiteSpace: 'nowrap'
    }
    const { index, location } = this.props;
    const date = moment(location.date).format("MM-DD-YYYY");

    return (
      <tr>
        <td>{index}</td>
        <td style={noWrap}>{location.name}</td>
        <td>{location.description}</td>
        <td style={noWrap} class="location-date">{date}</td>
        <td style={noWrap} class="location-actions">
          <Link to={{ pathname: `/admin/location/${location._id}`, state: {location: location}}} class="btn btn-raised btn-primary btn-xs">Edit</Link>
          &nbsp;
          <button class="btn btn-raised btn-danger btn-xs" onClick={::this._handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }

  _handleDelete(event) {
    event.preventDefault();
    if (confirm(`Are you sure you want to delete ${this.props.location.name}? All of it's events will be deleted too.`)) {
      this.props.onDelete(this.props.location);
    }
  }
}
