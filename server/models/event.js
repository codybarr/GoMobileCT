var mongoose = require('mongoose');
var validate = require('mongoose-validator');

// mongoose.Error.messages.general.default = '`{VALUE} is not a valid value for `{PATH}`';

// Validators

var dateValidator = [
  validate({
    validator: 'isDate',
    message: '{PATH} is invalid.'
  })
];

// Schema

var eventSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: 'Location is required'
  },
  startDateTime: {
    type: Date,
    required: 'Start Date / Time is required',
    validate: dateValidator
  },
  endDateTime: {
    type: Date,
    required: 'End Date / Time is required'
  }
},
{
  timestamps: true
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
