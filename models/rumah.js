const mongoose = require("mongoose");
const Keluarga = require("./keluarga");

const rumahSchema = new mongoose.Schema({
  keluarga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Keluarga",
  },
  keaktifanShalat: {
    type: String,
    enum: ["Jarang", "Kadang-kadang", "Sering"],
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
    enum: ["Tidak Bisa", "Terbata-bata", "Fasih"],
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
});

const Rumah = mongoose.model("Rumah", rumahSchema);

module.exports = Rumah;
