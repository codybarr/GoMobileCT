import React from 'react';
import { browserHistory, Link } from 'react-router';

import axios from 'axios';

import AuthStore from '../../stores/AuthStore';
import * as AuthActions from '../../actions/AuthActions';

import AdminNavTabs from '../../components/Admin/AdminNavTabs';
import UserListItem from '../../components/Admin/UserListItem';

import { Button } from 'react-bootstrap';

import UserAddModal from '../../components/Admin/UserAddModal';


export default class UserList extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showModal: false
    };
  }

  componentWillMount() {
    this._fetchUsers();
  }

  _fetchUsers() {
    let config = {
      headers: {'Authorization': AuthStore.getToken()}
    };

    axios.get(`/api/users`, config)
      .then( (response) => {
        this.setState({ users: response.data.users});
      });
  }

  _deleteUser(user) {
    // TODO: implement delete user
    // delete the user

    let config = {
      headers: {'Authorization': AuthStore.getToken()}
    };

    axios.delete(`/api/user/${user._id}`, config)
      .then( (response) => {
        const users = [...this.state.users];
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);

        this.setState({ users });
      })
      .catch( (err) => {
        if (err.response) {
          console.log('Delete User Error Response Data', err.response.data);
          // this.setState({ errors: err.response.data.errors});
        }
      });
  }

  _getUsers() {
    return this.state.users.map( (user, index) => {
      return (
        <UserListItem
          key={user._id}
          index={index + 1}
          user={user}
          onDelete={::this._deleteUser} />
      );
    });
  }

  _getAlert() {
    const { location } = this.props;

    if (location.state && location.state.alert) {
      return (
        <p class="alert alert-warning">{location.state.alert}</p>
      );
    } else {
      return null;
    }
  }


  render() {
    const users = this._getUsers();
    const alert = this._getAlert();

    let showModal = () => this.setState({showModal: true});
    let closeModal = () => {
      this._fetchUsers();
      this.setState({showModal: false});
    };

    return (
      <div class="UserList">
        {alert}
        <div class="panel panel-default">
          <AdminNavTabs active='user' />
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users}
            </tbody>
          </table>
        </div>
        <Button bsStyle="success" class="btn-raised" onClick={showModal}>Add User</Button>
        <UserAddModal show={this.state.showModal} onHide={closeModal} />
      </div>
    );
  }
}
