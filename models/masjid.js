const mongoose = require("mongoose");

const masjidSchema = new mongoose.Schema({
  namaMasjid: {
    type: String,
    required: true,
  },
  ketuaDKM: {
    type: String,
    required: true,
  },
  tahunBerdiri: {
    type: Number,
    required: true,
  },
  jumlahJamaah: {
    type: Number,
    required: true,
  },
  lokasiMasjid: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
});

const Masjid = mongoose.model("Masjid", masjidSchema);

module.exports = Masjid;
