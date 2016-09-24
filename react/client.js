import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import Layout from "./Pages/Layout";

import Home from "./Pages/Home";
import Locations from "./Pages/Locations";
import Calendar from "./Pages/Calendar";

import AddLocation from "./Pages/AddLocation";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="/locations" name="locations" component={Locations}></Route>
      <Route path="/calendar" name="calendar" component={Calendar}></Route>
      <Route path="/add/location" name="add-location" component={AddLocation}></Route>
    </Route>
  </Router>,
  document.getElementById('app'));