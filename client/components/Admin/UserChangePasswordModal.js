import React from 'react';
import ReactDOM from 'react-dom';

import { Modal } from 'react-bootstrap';

import AuthStore from '../../stores/AuthStore';

import axios from 'axios';

export default class UserAddModal extends React.Component {

  constructor() {
    super();

    this.state = {
      user: AuthStore.getUser(),
      errors: []
    };
  }

  _exit() {
    this.setState({ errors: [] });
  }

  _getErrors() {
    if (this.state.errors && this.state.errors.length) {
      let errors = this.state.errors.map( (error, index) => {
        return ( <li key={index}>{error}</li> );
      });

      return (
        <div class="alert alert-danger">
          <ul>
            {errors}
          </ul>
        </div>
      );
    } else {
      return null;
    }

  }

  render() {

    const errors = this._getErrors();

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg" onExit={::this._exit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {errors}

          <form class="form-horizontal" onSubmit={::this._handleChangePassword}>
            <div class="form-group">
              <label for="oldPassword" class="col-sm-2 control-label">Old Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="oldPassword"  ref={ (oldPassword) => { this._oldPassword = oldPassword }}/>
              </div>
            </div>

            <div class="form-group">
              <label for="newPassword" class="col-sm-2 control-label">New Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="newPassword"  ref={ (newPassword) => { this._newPassword = newPassword }} />
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword" class="col-sm-2 control-label">Confirm New Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="confirmPassword" ref={ (confirmPassword) => { this._confirmPassword = confirmPassword }}/>
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-10 col-sm-offset-2">
                <button type="submit" class="btn btn-raised btn-success">Change Password</button>
              </div>
            </div>
          </form>

        </Modal.Body>
      </Modal>
    );
  }

  _handleChangePassword(event) {
    event.preventDefault();

    if (this._newPassword.value !== this._confirmPassword.value) {
      this.setState({ errors: {
        password: {
          message: 'New and confirm passwords do not match.'
        }
      }});
    } else {

      let data = {
        oldPassword: this._oldPassword.value,
        newPassword: this._newPassword.value
      };

      let config = {
        headers: {'Authorization': AuthStore.getToken()}
      };

      axios.put(`/api/user/${this.state.user._id}/changepassword`, data, config)
        .then( (response) => {
          this.props.onHide();
        })
        .catch( (err) => {
          if (err.response) {
            console.log('Add User Error Response Data', err.response.data);
            this.setState({ errors: err.response.data.errors});
          }
        });
    }
  }
}
