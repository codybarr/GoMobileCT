import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router';

import Layout from './Pages/Layout';

import Home from './Pages/Home';
import Locations from './Pages/Locations';
import Calendar from './Pages/Calendar';
import PregnancyCalculator from './Pages/PregnancyCalculator';

import User from './Pages/User';
import Login from './Pages/User/Login';

import Admin from './Pages/Admin';

import LocationList from './Pages/Admin/LocationList';
import AddLocation from './Pages/Admin/Add/AddLocation';
import EditLocation from './Pages/Admin/Edit/EditLocation';

import EventList from './Pages/Admin/EventList';
import AddEvent from './Pages/Admin/Add/AddEvent';
import EditEvent from './Pages/Admin/Edit/EditEvent';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path='locations' name='locations' component={Locations} />
      <Route path='calendar' name='calendar' component={Calendar} />
      <Route path='calculator' name='pregnancyCalculator' component={PregnancyCalculator} />

      <Route path='user' name='user' component={User}>
        <IndexRedirect to='login' />
        <Route path='login' component={Login} />
      </Route>

      <Route path='admin' name='admin' component={Admin}>
        <IndexRedirect to='locations' />
        <Route path='locations' component={LocationList} />
        <Route path='events' name='admin-events' component={EventList} />
      </Route>
      <Route path='admin/add/location' name='add-location' component={AddLocation} />
      <Route path='admin/location/:id' component={EditLocation} />

      <Route path='admin/add/event' name='add-event' component={AddEvent} />
      <Route path='admin/event/:id' component={EditEvent} />
    </Route>
  </Router>,
  document.getElementById('app'));
