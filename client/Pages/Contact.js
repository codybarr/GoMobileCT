import React from 'react';
import axios from 'axios';

import { Link } from 'react-router';

export default class Contact extends React.Component {

  constructor() {
    super();

    this.state = {
      alert: ''
    }
  }

  _getAlert() {
    if (this.state.alert) {
      return(
        <div class="alert alert-dismissible alert-success">
          <button type="button" class="close" data-dismiss="alert">×</button>
          <strong>{this.state.alert}</strong>
        </div>
      );
    }
  }

  render() {
    const alert = this._getAlert();

    return ( 
      <div class="contact">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <h1>Contact</h1>

              <p>
                If you see our Mobile Unit parked, feel free to 
                walk up, text or call to come on-board for 
                a free pregnancy test. Text or call us (860-377-8460)
                for an appointment or more information.

                <br/>

                Whatever "it" is, we want to hear it. Whether you need more information about 
                our services, want us to reach out to your community,
                ​or just have a pregnancy story to tell, 
                this is the place to let your voice be heard. 
                You can also message us below:
              </p>

              <p>
                <strong>Mobile Unit Phone:</strong><br/>
                Call or Text 860-377-8460
                <br/>
                <strong>Office:</strong><br/>
                860-786-1124
              </p>

              { alert }

              <form class="form-horizontal" onSubmit={::this._sendEmail}>
                <div class="form-group">
                  <label for="fromInput" class="col-sm-2 control-label">From</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id="fromInput" ref={(from) => this._from = from} />
                  </div>
                </div>

                <div class="form-group">
                  <label for="phoneInput" class="col-sm-2 control-label">Phone Number</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id="phoneInput" ref={(phone) => this._phone = phone} />
                  </div>
                </div>

                <div class="form-group">
                  <label for="messageInput" class="col-sm-2 control-label">Message</label>
                  <div class="col-sm-6">
                    <textarea rows="5" class="form-control" id="messageInput" ref={(message) => this._message = message} />
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-10 col-sm-offset-2">
                    <button type="submit" class="btn btn-raised btn-primary">Send Email</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _clearEmailForm() {
    this._from.value = '';
    this._phone.value = '';
    this._message.value = '';
  }

  _sendEmail(e) {
    e.preventDefault();

    let email = {
      from: this._from.value,
      phone: this._phone.value,
      message: this._message.value
    };

    axios.post('/api/email/contact', email)
      .then( (response) => {
        console.log(response.data.message);
        this._clearEmailForm();
        this.setState({ alert: `Email sent successfully. We'll get in touch with you soon!`});
      });
  }
}
