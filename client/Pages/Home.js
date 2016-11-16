import React from 'react';
import Navbar from '../components/Navbar';

import { Parallax } from 'react-parallax';

export default class Home extends React.Component {

  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <Navbar />

        <div class="home">
          <Parallax bgImage="/images/mobile_unit_outside.jpg" strength={400} class="parallax">
            <div class="parallax-content">
              <h1>Go Mobile CT</h1>
              <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <p>
                <a class="btn btn-raised btn-info btn-lg">About Us</a>
                &nbsp;
                <a class="btn btn-raised btn-success btn-lg">Locations</a>
              </p>
            </div>
          </Parallax>
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-4 text-center featured-item">
                <i class="fa fa-user-md fa-4x mobile" aria-hidden="true"></i>
                <h4>Mobile Clinic</h4>
                <p>
                  We currently do not have "set" locations but we will soon! Our plans are to be parked near UCONN, Hartford, Manchester, Norwich, Putnam and Waterbury. In the meantime, if you are in need of our services please call 860-450-8073 and we will try to accommodate you.
                </p>
              </div>
              <div class="col-sm-4 text-center featured-item">
                <i class="fa fa-info-circle fa-4x about" aria-hidden="true"></i>
                <h4>About Us</h4>
                <p>
                  We are here for you! For over 30 years we have helped thousands of women in northeast CT. We are now expanding out to reach the whole state through our mobile unit. Free pregnancy testing, sonograms, consultations, and education on all your choices.
                </p>
              </div>
              <div class="col-sm-4 text-center featured-item">
              <i class="fa fa-heartbeat fa-4x expect" aria-hidden="true"></i>
                <h4>What to Expect</h4>
                <p>
                  We currently do not have "set" locations but we will soon! Our plans are to be parked near UCONN, Hartford, Manchester, Norwich, Putnam and Waterbury. In the meantime, if you are in need of our services please call 860-450-8073 and we will try to accommodate you.
                </p>
              </div>
            </div>
          </div>
          <Parallax bgImage="/images/mobile_unit_inside.jpg" strength={400} class="parallax">
            <div class="parallax-content">
              <h2>Our goal is your comfort and to provide you with professional services</h2>
              <p>
                <a class="btn btn-raised btn-success btn-lg">Locations</a>
              </p>
            </div>
          </Parallax>
        </div>
        <footer class="bg-primary footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-3 footer-box">
                <p>
                  GO MOBILE CT is  a  service  of <a href="http://carefamilies.com">Caring Families Pregnancy Services</a>
                </p>
                <p>
                  Text or call: <a href="tel:860-377-8460">860-377-8460</a> <a href="mailto:Kerry@gomobilect.com">Kerry@gomobilect.com</a>
                </p>
              </div>
              <div class="col-sm-3 col-md-offset-6 footer-box">
                <i class="fa fa-facebook fa-2x" aria-hidden="true"></i>
                <i class="fa fa-twitter fa-2x" aria-hidden="true"></i>
                <i class="fa fa-google-plus fa-2x" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
