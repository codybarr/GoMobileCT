var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
