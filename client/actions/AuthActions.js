import dispatcher from '../dispatcher';

export function login(email, password, cb) {
  dispatcher.dispatch({
    type: 'LOGIN',
    email,
    password,
    cb
  });
}

export function logout() {
  dispatcher.dispatch({
    type: 'LOGOUT'
  });
}
