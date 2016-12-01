import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router';

import AuthStore from './stores/AuthStore';

import StaticLayout from './Pages/StaticLayout';
import Layout from './Pages/Layout';

import Home from './Pages/Home';
import Locations from './Pages/Locations';
import Calendar from './Pages/Calendar';
import PregnancyCalculator from './Pages/PregnancyCalculator';
import About from './Pages/About';

import NotFound404 from './Pages/NotFound404';
import NotAuthorized401 from './Pages/NotAuthorized401';

import User from './Pages/User';
import Login from './Pages/User/Login';
import Profile from './Pages/User/Profile';

import Admin from './Pages/Admin';

import LocationList from './Pages/Admin/LocationList';
import AddLocation from './Pages/Admin/Add/AddLocation';
import EditLocation from './Pages/Admin/Edit/EditLocation';

import EventList from './Pages/Admin/EventList';
import AddEvent from './Pages/Admin/Add/AddEvent';
import EditEvent from './Pages/Admin/Edit/EditEvent';

import UserList from './Pages/Admin/UserList';


function requireAuth(nextState, replace) {
  if (!AuthStore.loggedIn()) {
    replace({ pathname: '/user/login', state: { error: 'You need to login to access this page.' } });
  }
}

function requireSuperadmin(nextState, replace) {
  if (!AuthStore.isSuperAdmin()) {
    replace({ pathname: '/admin', state: {alert: "You must be a Superadmin to access this section"}});
  }
}

function checkLoggedIn(nextState, replace) {
  if (AuthStore.loggedIn()) {
    replace({ pathname: '/admin', state: { alert: "You're already logged in silly goose!"}});
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={StaticLayout}>
      <Route path='/'component={Home}></Route>
      <Route path='about' name='about' component={About} />
    </Route>
    <Route component={Layout}>
      <Route path='locations' name='locations' component={Locations} />
      <Route path='calendar' name='calendar' component={Calendar} />
      <Route path='calculator' name='pregnancyCalculator' component={PregnancyCalculator} />

      <Route path='user' name='user' component={User}>
        <IndexRedirect to='login' />
        <Route path='login' component={Login} onEnter={checkLoggedIn}/>
        <Route path='profile' component={Profile} onEnter={requireAuth}/>
      </Route>

      <Route path='admin' name='admin' component={Admin} onEnter={requireAuth}>
        <IndexRedirect to='locations' />
        <Route path='locations' component={LocationList} />
        <Route path='add/location' name='add-location' component={AddLocation} />
        <Route path='location/:id' component={EditLocation} />

        <Route path='events' name='admin-events' component={EventList} />
        <Route path='add/event' name='add-event' component={AddEvent} />
        <Route path='event/:id' component={EditEvent} />

        <Route onEnter={requireSuperadmin}>
          <Route path='users' name='admin-users' component={UserList} />
        </Route>
      </Route>

      <Route path='*' component={NotFound404} />
    </Route>
  </Router>,
  document.getElementById('app'));
