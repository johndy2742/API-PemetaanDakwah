const mongoose = require("mongoose");
const Keluarga = require("./keluarga");

const rumahSchema = new mongoose.Schema({
  keluarga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Keluarga",
  },
  keaktifanShalat: {
    type: String,
    enum: ["jarang", "kadang-kadang", "sering"],
    required: true,
  },
  informasiHaji: {
    type: Boolean,
    default: false,
  },
  kondisiZakat: {
    type: Boolean,
    default: false,
  },
  kemampuanBacaQuran: {
    type: String,
    enum: ["tidak bisa", "terbata-bata", "fasih"],
    required: true,
  },
  kurban: {
    type: Boolean,
    default: false,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Rumah = mongoose.model("Rumah", rumahSchema);

module.exports = Rumah;
