import React from 'react';
import { Link } from 'react-router';

import moment from 'moment';

export default class LocationListItem extends React.Component {

  render() {
    const { index, location } = this.props;
    const date = moment(location.date).format("MM-DD-YYYY");

    return (
      <tr>
        <td>{index}</td>
        <td>{location.name}</td>
        <td>{location.description}</td>
        <td>{date}</td>
        <td>Some actions...</td>
      </tr>
    );
  }
}
