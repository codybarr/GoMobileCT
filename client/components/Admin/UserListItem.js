import React from 'react';
import { Link } from 'react-router';

import moment from 'moment';

export default class UserListItem extends React.Component {

  render() {
    const noWrap = {
      whiteSpace: 'nowrap'
    }
    const { index, user } = this.props;
    const updatedAt = moment(user.updatedAt).format("MMMM DD, YYYY");

    return (
      <tr>
        <td>{index}</td>
        <td style={noWrap}>{user.email}</td>
        <td>{user.role}</td>
        <td style={noWrap} class="locationDD, date">{updatedAt}</td>
        <td style={noWrap} class="location-actions">
          <button class="btn btn-raised btn-success btn-xs">Reset Password</button>
          &nbsp;
          <button class="btn btn-raised btn-danger btn-xs" onClick={::this._handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }

  _handleDelete(event) {
    event.preventDefault();

    if (confirm(`Are you sure you want to delete ${this.props.user.email}?`)) {
      this.props.onDelete(this.props.user);
    }
  }
}
