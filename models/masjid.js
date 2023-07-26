const mongoose = require('mongoose');

const masjidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: String,
      required: true
    },
    lng: {
      type: String,
      required: true
    }
  }
});

const Masjid = mongoose.model('masjid', masjidSchema);

module.exports = Masjid;
