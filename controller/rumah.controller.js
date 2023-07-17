const Rumah = require('../models/rumah');
const Keluarga = require('../models/keluarga');

const rumahController = {
  create: async (req, res) => {
    try {
      const rumah = new Rumah({
        keaktifanShalat: req.body.keaktifanShalat,
        informasiHaji: req.body.informasiHaji,
        kondisiZakat: req.body.kondisiZakat,
        kemampuanBacaQuran: req.body.kemampuanBacaQuran,
        kurban: req.body.kurban,
        lat: req.body.lat,
        lng: req.body.lng,
      });

      await rumah.save();

      res.status(201).json({
        message: 'Rumah created successfully',
        rumah: rumah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const keluargas = await Keluarga.find().populate("rumah");
  
      const modifiedKeluargas = keluargas.map((keluarga) => ({
        rumahId: keluarga.rumah._id,
        keluargaId: keluarga._id,
        kepalaKeluarga: keluarga.kepalaKeluarga ? keluarga.kepalaKeluarga : null,
        keaktifanShalat: keluarga.rumah.keaktifanShalat,
        informasiHaji: keluarga.rumah.informasiHaji,
        kondisiZakat: keluarga.rumah.kondisiZakat,
        kemampuanBacaQuran: keluarga.rumah.kemampuanBacaQuran,
        kurban: keluarga.rumah.kurban,
        lat: keluarga.rumah.lat,
        lng: keluarga.rumah.lng,
      }));
  
      res.status(200).json({
        message: "Keluargas fetched successfully",
        keluargas: modifiedKeluargas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
  
  

  getById: async (req, res) => {
    try {
      const keluarga = await Keluarga.findById(req.params.id).populate("rumah");
  
      if (!keluarga) {
        res.status(404).json({ message: "Keluarga not found" });
        return;
      }
  
      const modifiedKeluarga = {
        kepalaKeluarga: keluarga.kepalaKeluarga ? keluarga.kepalaKeluarga : null,
        _id: keluarga.rumah._id,
        keaktifanShalat: keluarga.rumah.keaktifanShalat,
        informasiHaji: keluarga.rumah.informasiHaji,
        kondisiZakat: keluarga.rumah.kondisiZakat,
        kemampuanBacaQuran: keluarga.rumah.kemampuanBacaQuran,
        kurban: keluarga.rumah.kurban,
        lat: keluarga.rumah.lat,
        lng: keluarga.rumah.lng,
      };
  
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluarga: modifiedKeluarga,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Keluarga not found" });
    }
  },
  

  update: async (req, res) => {
    try {
      const rumah = await Rumah.findById(req.params.id);

      if (!rumah) {
        return res.status(404).json({ message: 'Rumah not found' });
      }

      rumah.keaktifanShalat = req.body.keaktifanShalat;
      rumah.informasiHaji = req.body.informasiHaji;
      rumah.kondisiZakat = req.body.kondisiZakat;
      rumah.kemampuanBacaQuran = req.body.kemampuanBacaQuran;
      rumah.kurban = req.body.kurban;
      rumah.lat = req.body.lat;
      rumah.lng = req.body.lng;

      await rumah.save();

      res.status(200).json({
        message: 'Rumah updated successfully',
        rumah: rumah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Rumah not found' });
    }
  },

  delete: async (req, res) => {
    try {
      const rumah = await Rumah.findById(req.params.id);
  
      if (!rumah) {
        res.status(404).json({
          message: 'Rumah not found',
        });
        return;
      }
  
      // Delete associated Keluarga documents
      await Keluarga.deleteMany({ rumah: rumah._id });
  
      // Delete the Rumah document
      await Rumah.deleteOne({ _id: rumah._id });
  
      res.status(200).json({
        message: 'Rumah deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Rumah not found',
      });
    }
  },
};  

module.exports = rumahController;
