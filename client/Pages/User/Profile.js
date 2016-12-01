import React from 'react';
import { browserHistory } from 'react-router';

import AuthStore from '../../stores/AuthStore';
import * as AuthActions from '../../actions/AuthActions';

import UserChangePasswordModal from '../../components/Admin/UserChangePasswordModal';


export default class Profile extends React.Component {

  constructor() {
    super();

    this.state = {
      user: AuthStore.getUser(),
      message: '',
      showModal: false
    };
  }

  _getMessage() {
    const { message } = this.state.message;

    if (message) {
      return (
        <div class="alert alert-success">
          {message}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {

    let showModal = (e) => {
      e.preventDefault();
      this.setState({showModal: true});
    };

    let closeModal = () => {
      this.setState({showModal: false, message: 'Password changed successfully!'});
    };

    const { email, role } = this.state.user;
    const message = this._getMessage();

    return (
      <div class="user-profile">
        <h1>My Profile</h1>

        {message}

        <form class="form-horizontal">
          <div class="form-group">
            <label for="email" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="locationName" value={email} readOnly={true}/>
            </div>
          </div>

          <div class="form-group">
            <label for="role" class="col-sm-2 control-label">Role</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="locationName" value={role} readOnly={true} />
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button class="btn btn-raised btn-success" onClick={showModal}>Change Password</button>
            </div>
          </div>
        </form>
        <UserChangePasswordModal show={this.state.showModal} onHide={closeModal} />
      </div>
    );
  }
}
