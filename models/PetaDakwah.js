const mongoose = require("mongoose");

const petaDakwahSchema = new mongoose.Schema({
  pembicara: {
    type: String,
    required: true,
  },
  topikDakwah: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  waktuMulai: {
    type: Date,
    required: true,
  },
  waktuAkhir: {
    type: Date,
    required: true,
  },
});

const PetaDakwah = mongoose.model("PetaDakwah", petaDakwahSchema);

module.exports = PetaDakwah;
