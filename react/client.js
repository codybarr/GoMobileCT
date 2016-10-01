import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router';

import Layout from "./Pages/Layout";

import Home from "./Pages/Home";
import Locations from "./Pages/Locations";
import Calendar from "./Pages/Calendar";

import Admin from "./Pages/Admin";
import AdminLocations from "./Pages/Admin/AdminLocations";
import AdminEvents from "./Pages/Admin/AdminEvents";

import AddLocation from "./Pages/AddLocation";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="locations" name="locations" component={Locations} />
      <Route path="calendar" name="calendar" component={Calendar} />
      <Route path="add/location" name="add-location" component={AddLocation} />
      <Route path="admin" name="admin" component={Admin}>
        <IndexRedirect to="locations" />
        <Route path="locations" component={AdminLocations} />
        <Route path="events" name="admin-events" component={AdminEvents} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('app'));
