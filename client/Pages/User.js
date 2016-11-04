import React from 'react';

export default class User extends React.Component {

  render() {
    return (
      <div class="User">
        {this.props.children}
      </div>
    );
  }
}
