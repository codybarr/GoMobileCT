import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router';

import Layout from "./Pages/Layout";

import Home from "./Pages/Home";
import Locations from "./Pages/Locations";
import Calendar from "./Pages/Calendar";

import Admin from "./Pages/Admin";

import LocationList from "./Pages/Admin/LocationList";
import AddLocation from "./Pages/Admin/Add/AddLocation";
import EditLocation from "./Pages/Admin/Edit/EditLocation";

import EventList from "./Pages/Admin/EventList";


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="locations" name="locations" component={Locations} />
      <Route path="calendar" name="calendar" component={Calendar} />
      <Route path="admin" name="admin" component={Admin}>
        <IndexRedirect to="locations" />
        <Route path="locations" component={LocationList} />
        <Route path="events" name="admin-events" component={EventList} />
      </Route>
      <Route path="admin/add/location" name="add-location" component={AddLocation} />
      <Route path="admin/location/:id" component={EditLocation} />
    </Route>
  </Router>,
  document.getElementById('app'));
