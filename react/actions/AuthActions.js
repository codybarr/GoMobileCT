import dispatcher from '../dispatcher';

export function login(email, password) {
  dispatcher.dispatch({
    type: 'LOGIN',
    email,
    password
  });
}

export function logout() {
  dispatcher.dispatch({
    type: 'LOGOUT'
  });
}
