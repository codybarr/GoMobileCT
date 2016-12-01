import React from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

import AuthStore from '../../stores/AuthStore';

import axios from 'axios';

export default class UserAddModal extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: {}
    }
  }

  _exit() {
    this.setState({ errors: {} });
  }

  _getErrors() {
    if (this.state.errors && Object.keys(this.state.errors).length && this.state.errors.constructor === Object) {
      // Object.keys(obj).length === 0 && obj.constructor === Object
      // return this.state.errors.map( (error, index) => {
      //
      // });
      console.log('Add User Errors', this.state.errors);

      let errorMessages = [];

      for (var field in this.state.errors) {
        var error = this.state.errors[field];
        errorMessages.push(
          <li key={field}>{error.message}</li>
        );
      }

      return (
        <div class="alert alert-danger">
          <ul>
            {errorMessages}
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
          <Modal.Title id="contained-modal-title-lg">Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {errors}

          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" ref={(email) => this._email = ReactDOM.findDOMNode(email)} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" ref={(password) => this._password = ReactDOM.findDOMNode(password)} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalRole">
              <Col componentClass={ControlLabel} sm={2}>
                Role
              </Col>
              <Col sm={10}>
                <FormControl componentClass="select" placeholder="select" ref={(role) => this._role = ReactDOM.findDOMNode(role)}>
                  <option value="Client">Client</option>
                  <option value="Admin">Admin</option>
                  <option value="Superadmin">Superadmin</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" bsStyle="success" class="btn-raised" onClick={::this._handleAddUser}>
                  Add User
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  _handleAddUser(event) {
    event.preventDefault();

    let newUser = {
      email: this._email.value,
      password: this._password.value,
      role: this._role.value
    };

    let config = {
      headers: {'Authorization': AuthStore.getToken()}
    };

    axios.post('/api/user/add', newUser, config)
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
