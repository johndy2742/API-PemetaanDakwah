const mongoose = require("mongoose");

const petaDakwahSchema = new mongoose.Schema({
  masjidId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Masjid",
    required: true,
  },
  pembicara: {
    type: String,
    required: true,
  },
  topikDakwah: {
    type: String,
    required: true,
  },
  kategori: {
    type: String,
    enum: ["kehidupan", "ibadah", "keluarga", "remaja", "akhlak", "toleransi", "tauhid"],
    required: true,
  },
  gelar_pembicara: {
    type: String,
    required: true,
  },
  asal_instansi_pembicara: {
    type: String,
    required: true,
  },
  foto: {
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
  tipe_kegiatan: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  nama_penyelenggara: {
    type: String,
    required: true,
  },
  alamat_penyelenggara: {
    type: String,
    required: true,
  },
  penanggung_jawab: {
    type: String,
    required: true,
  },
  no_hp_penyelenggara: {
    type: String,
    required: true,
  },
});

const PetaDakwah = mongoose.model("PetaDakwah", petaDakwahSchema);

module.exports = PetaDakwah;
