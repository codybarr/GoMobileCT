import React from 'react';

export default class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      error: ''
    }
  }

  _getError() {
    if (this.state.error) {
      return (
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-2">
            <p class="alert alert-danger">There was an error logging in</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const error = this._getError();

    return (
      <div>
        <h2>Login</h2>

        <form class="form-horizontal" >
          {error}

          <div class="form-group">
            <label class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
              <input type="text" class="form-control username" placeholder="Username"/>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control password" placeholder="Password" />
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}
