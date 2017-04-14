import React from 'react';

import Navbar from '../components/Navbar';
import MapContainer from '../components/MapContainer';

export default class Locations extends React.Component {

  render() {
    return (
    	<div>
    		<Navbar />
    		<MapContainer />
		</div>
    );
  }
}
