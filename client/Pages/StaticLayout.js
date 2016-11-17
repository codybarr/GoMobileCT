import React from 'react';
import { Link } from 'react-router';

import Navbar from '../components/Navbar';

export default class StaticLayout extends React.Component {

  render() {
    return (
      <div>
        <Navbar />

        {this.props.children}

        <footer class="footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6 footer-box">
                <h4>Info</h4>
                <div class="hline-w"></div>
                <p>
                  GO MOBILE CT is  a  service  of <a href="http://carefamilies.com">Caring Families Pregnancy Services</a>
                </p>
                <p>
                  Text/Call: <a href="tel:860-377-8460">860-377-8460</a>
                </p>
                <p>
                  Or Email: <a href="mailto:Kerry@gomobilect.com">Kerry@gomobilect.com</a>
                </p>
              </div>
              <div class="col-sm-6 footer-box">
                <h4>Social Links</h4>
                <div class="hline-w"></div>
                <a href="http://facebook.com/GoMobileCT"><i class="fa fa-facebook fa-4x" aria-hidden="true"></i></a>
                &nbsp;
                <a href="http://twitter.com/GoMobileCT"><i class="fa fa-twitter fa-4x" aria-hidden="true"></i></a>
                {/* <i class="fa fa-google-plus fa-2x" aria-hidden="true"></i> */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
