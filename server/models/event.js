var mongoose = require('mongoose');

// mongoose.Error.messages.general.default = '`{VALUE} is not a valid value for `{PATH}`';

// Schema

var eventSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: 'Location is required'
  },
  dayOfWeek: {
    type: String,
    required: 'Day of Week is required',
  },
  startTime: {
    type: String,
    required: 'Start Time is required',
  },
  endTime: {
    type: String,
    required: 'End Time is required'
  }
},
{
  timestamps: true
});

// Middleware
eventSchema.post('save', function(error, doc, next) {
  next(error);
});



var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
