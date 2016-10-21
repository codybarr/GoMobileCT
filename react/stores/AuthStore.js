import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { browserHistory } from 'react-router';

class AuthStore extends EventEmitter {
  constructor() {
    super();

    this.authenticated = JSON.parse(localStorage.getItem('authenticated')) || false;
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Returns

  isAdmin() {
    return this.user.role === "Admin";
  }

  isSuperAdmin() {
    return this.user.role === "Superadmin";
  }

  loggedIn() {
    return this.authenticated;
  }

  getUser() {
    return this.user;
  }

  // Actions

  login(email, password) {

    $.ajax({
      async: true,
      method: 'POST',
      contentType: "application/json",
      url: '/api/auth/login',
      data: JSON.stringify({ email: email, password: password }),
      success: (data) => {
        console.log(data);

        // Set local variables
        this.authenticated = true;
        this.user = data.user;

        // Add info to local storage for persistence
        localStorage.setItem('token', data.token);
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('user', JSON.stringify(data.user));

        // Route the user back to the admin locations page
        browserHistory.push('/admin');
        this.emit("change");
      }
    });
  }

  logout() {

    // Clear local variables
    this.authenticated = false;
    this.user = {};

    // Clear local storage
    localStorage.clear();

    browserHistory.push('/');
    this.emit("change");
  }

  // Action Handler
  handleActions(action) {
    switch(action.type) {
      case "LOGIN": {
        this.login(action.email, action.password);
      }
      case "LOGOUT": {
        this.logout();
      }
    }
    console.log("AuthStore received an action", action);
  }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
