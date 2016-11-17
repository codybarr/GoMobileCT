import React from 'react';

export default class Admin extends React.Component {

  render() {
    return (
      <div class="Admin">
        <h1>Admin</h1>
        {this.props.children}
      </div>
    );
  }
}
