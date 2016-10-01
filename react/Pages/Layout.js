import React from 'react';
import { Link } from 'react-router';

import Navbar from '../components/Navbar';

export default class Layout extends React.Component {

  render() {
    return (

      <div>
        <Navbar />

        <div class="container-fluid">

            <div class="row">
                <div class="col-lg-12">
                    <h1>GoMobileCT</h1>

                    {this.props.children}
                </div>
            </div>

        </div>
      </div>
    );
  }
}
