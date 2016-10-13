import React from 'react';
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
      <div>
        <h2>Pregnancy Calculator</h2>

        <div class="input-group date">
            <input class="form-control datepicker" type="text" placeholder="First Day of Last Menstrual Period" ref={(date) => this._periodDate = date} />
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-calendar"></span>
            </div>
        </div>
        <br />

        <div class="input-group">
          <span class="input-group-addon">Date of Conception *</span>
          <input type="text" class="form-control" id="date-conception" readOnly="readonly" ref={(date) => this._conceptionDate = date}/>
        </div>
        <br />

        <div class="input-group">
          <span class="input-group-addon">Gestational Age *</span>
          <input type="text" class="form-control" id="date-gestation" readOnly="readonly" ref={(age) => this._gestAge = age}/>
        </div>
        <br />

        <div class="input-group">
          <span class="input-group-addon">Due Date *</span>
          <input type="text" class="form-control" id="date-due" readOnly="readonly" ref={(date) => this._dueDate = date}/>
        </div>
        <br />

        <p class="congratulations hidden"><span style={congratsColor}>Congratulations! Because your gestational age is between 6 and 18 weeks you may qualify for a free ultrasound to determine viability. Please <a href="http://www.womenscenterec.com/#!contact/cln9">schedule</a> for an appointment.</span></p>

        <p class="text-danger">* This is not a diagnosis. The calculations provided here are estimates only.</p>
      </div>
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
