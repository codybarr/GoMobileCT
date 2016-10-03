import React from 'react';

export default class InfoWindow extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { name, address, description } = this.props.info;

    let addressName;
    if (address) {
      addressName = <p><strong>Address:</strong> {address}</p>;
    }

    return (
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">{name || 'No Location Selected'}</h3>
        </div>
        <div class="panel-body">
          {addressName}
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
