import React from 'react';

import { Link } from 'react-router';

export default class Home extends React.Component {

  constructor() {
    super();
  }

  render() {

    return (
      <div class="home">
        <div class="parallax outside">
          <div class="parallax-content">
            <h1>Free Pregnancy Testing & Ultrasound</h1>
            <p class="lead">Results while you wait in a friendly and comfortable environment.</p>
            <p>
              <Link to='about' class="btn btn-raised btn-info btn-lg">About Us</Link>
              &nbsp;
              <Link to='calculator' class="btn btn-raised btn-danger btn-lg">When Did I Conceive?</Link>
            </p>
          </div>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-4 text-center featured-item">
              <i class="fa fa-user-md fa-4x mobile" aria-hidden="true"></i>
              <h4><Link to='locations'>Mobile Clinic Locations</Link></h4>
              <p>
                We currently do not have "set" locations but we will soon! Our plans are to be parked near UCONN, Hartford, Manchester, Norwich, Putnam and Waterbury. In the meantime, if you are in need of our services please call 860-450-8073 and we will try to accommodate you.
              </p>
            </div>
            <div class="col-sm-4 text-center featured-item">
              <i class="fa fa-info-circle fa-4x about" aria-hidden="true"></i>
              <h4><Link to='about'>About Us</Link></h4>
              <p>
                We are here for you! For over 30 years we have helped thousands of women in Northeast CT. We are now expanding out to reach the whole state through our mobile unit. We offer free pregnancy testing, sonograms, consultations, and education on all your choices.
              </p>
            </div>
            <div class="col-sm-4 text-center featured-item">
            <i class="fa fa-heartbeat fa-4x expect" aria-hidden="true"></i>
              <h4><Link to='contact'>Contact Us</Link></h4>
              <p>
                Feel free to contact us via email, text or phone call.  All our services are confidential.  If you need more info about us, don't hesitate to check in with us.
              </p>
            </div>
          </div>
        </div>
        <div class="parallax inside">
          <div class="parallax-content">
            <h1>Our goal is your comfort and to provide you with professional services</h1>
            <p>
              <Link to='locations' class="btn btn-raised btn-success btn-lg">Locations</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
