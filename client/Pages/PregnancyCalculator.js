import React from 'react';
import { Link } from 'react-router';

import moment from 'moment';

export default class PregnancyCalculator extends React.Component {

  constructor() {
    super();

    this.state = {
      dueDate: ''
    }
  }

  componentDidMount() {
    $('.datepicker').datepicker({
      autoclose: true,
      todayHighlight: true,
      format: 'MM d, yyyy',
      endDate: '+0d'
    }).on('changeDate', (e) => {
      ::this._handleChange(e);
    });
  }

  render() {
    const congratsColor = {
      color: 'green'
    };

    return (
      <form class="form-horizontal">
        <h2>Pregnancy Calculator</h2>

        <div class="form-group">
          <label class="col-sm-3 control-label">First Day of Last Menstrual Period</label>
          <div class="col-sm-9">
            <input class="form-control datepicker" type="text" placeholder="1/1/2016" ref={(date) => this._periodDate = date} />
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Date of Conception *</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="date-conception" readOnly="readonly" ref={(date) => this._conceptionDate = date}/>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Gestational Age *</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="date-gestation" readOnly="readonly" ref={(age) => this._gestAge = age}/>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Due Date *</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="date-due" readOnly="readonly" ref={(date) => this._dueDate = date}/>
          </div>
        </div>

        <div class="col-sm-9 col-sm-offset-3">
          <p class="text-danger">* This is not a diagnosis. The calculations provided here are estimates only.</p>
          <p class="alert alert-success congratulations hidden"><strong>Congratulations!</strong> Because your gestational age is between 6 and 18 weeks you may qualify for a free ultrasound to determine viability. Please <Link to="/contact" class="alert-link">contact us</Link> to schedule an appointment!</p>
        </div>
      </form>
    );
  }

  _handleChange(e) {
    var shortDateFormat = "MMMM D, YYYY";

    let lastPeriod = moment(this._periodDate.value, shortDateFormat);
    let today = moment();

    // Calculate Conception Date
    let conceptionDate = lastPeriod.clone().add(2, 'weeks').format(shortDateFormat);

    // Calculate Gestational Age
    let gestAge = today.diff(lastPeriod, 'days');
    gestAge = Math.floor(gestAge / 7) + (Math.floor(gestAge / 7) === 1 ? ' week, ' : ' weeks, ') + (gestAge % 7) + ((gestAge % 7) === 1 ? ' day' : ' days');

    // Calculate Due Date
    let dueDate = lastPeriod.clone().add(40, 'weeks').format(shortDateFormat);

    // Update the dates

    this._conceptionDate.value = conceptionDate;
    this._gestAge.value = gestAge;
    this._dueDate.value = dueDate;

    if (today.isBetween(lastPeriod.clone().add(6, 'weeks'), lastPeriod.clone().add(18, 'weeks'))) {
      $('.congratulations').removeClass('hidden');
    } else {
      $('.congratulations').addClass('hidden');
    }
  }
}
