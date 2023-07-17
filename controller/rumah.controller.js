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
      const rumahs = await Keluarga.find().populate("rumah");

      const modifiedRumahs = rumahs.map((rumah) => ({
        kepalaKeluarga: rumah.kepalaKeluarga ? rumah.kepalaKeluarga: null,
        _id: rumah.rumah._id,
        keaktifanShalat: rumah.rumah.keaktifanShalat,
        informasiHaji: rumah.rumah.nformasiHaji,
        kondisiZakat: rumah.rumah.kondisiZakat,
        kemampuanBacaQuran: rumah.rumah.kemampuanBacaQuran,
        kurban: rumah.rumah.kurban,
        lat: rumah.rumah.lat,
        lng: rumah.rumah.lng,
        
      }));

      res.status(200).json({
        message: "Rumahs fetched successfully",
        rumahs: modifiedRumahs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
  

  getById: async (req, res) => {
    try {
      const rumah = await Rumah.findById(req.params.id);

      if (!rumah) {
        res.status(404).json({ message: 'Rumah not found' });
        return;
      }

      res.status(200).json({
        message: 'Rumah fetched successfully',
        rumah: rumah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Rumah not found' });
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
