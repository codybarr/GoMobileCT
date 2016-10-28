var mongoose = require('mongoose');

mongoose.Error.messages.general.default = '`{VALUE} is not a valid value for `{PATH}`';

var eventSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: 'Location is required'
  },
  startDateTime: {
    type: Date,
    required: 'Start Date / Time is required'
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
