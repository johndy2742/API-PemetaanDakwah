const mongoose = require("mongoose");

const keluargaSchema = new mongoose.Schema({
  rumah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rumah",
    required: true,
  },
  kepalaKeluarga: {
    nama: {
      type: String,
      required: true,
    },
    peran: {
      type: String,
      required: true,
    },
    usia: {
      type: String,
      required: true,
    },
    pekerjaan: {
      type: String,
      required: true,
    },
  },
  anggotaKeluarga: [
    {
      nama: {
        type: String,
        required: false,
      },
      peran: {
        type: String,
        required: false,
      },
      usia: {
        type: String,
        required: false,
      },
      pekerjaan: {
        type: String,
        required: false,
      },
    },
  ],
  fotoRumah: {
    type: String,
    required: true,
  },
});

const Keluarga = mongoose.model('Keluarga', keluargaSchema);

module.exports = Keluarga;
