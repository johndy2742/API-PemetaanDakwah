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
        alamat : req.body.alamat,
        createdAt: new Date(),
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
        fotoRumah: keluarga.fotoRumah,
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
        alamat : keluarga.rumah.alamat,
        createdAt : keluarga.rumah.createdAt
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
      const keluarga = await Keluarga.findOne({ rumah: req.params.id }).populate("rumah");
  
      if (!keluarga) {
        res.status(404).json({ message: "Keluarga not found for the given Rumah ID" });
        return;
      }
  
      const modifiedKeluarga = {
        kepalaKeluarga: keluarga.kepalaKeluarga ? keluarga.kepalaKeluarga : null,
        RumahId: keluarga.rumah._id,
        keaktifanShalat: keluarga.rumah.keaktifanShalat,
        informasiHaji: keluarga.rumah.informasiHaji,
        kondisiZakat: keluarga.rumah.kondisiZakat,
        kemampuanBacaQuran: keluarga.rumah.kemampuanBacaQuran,
        kurban: keluarga.rumah.kurban,
        lat: keluarga.rumah.lat,
        lng: keluarga.rumah.lng,
        alamat: keluarga.rumah.alamat,
      };
  
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluargas: modifiedKeluarga,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching Keluarga" });
    }
  },
  
  getByZakat: async (req, res, status) => {
    try {
      const keluargas = await Keluarga.find().populate("rumah");
  
      const modifiedKeluargas = keluargas.map((keluarga) => ({
        fotoRumah: keluarga.fotoRumah,
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
        alamat: keluarga.rumah.alamat,
      }));
      const keluargaWithKondisizakat = modifiedKeluargas.filter((keluargaObj) => {
        return keluargaObj.kondisiZakat === status;
      });
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluargas: keluargaWithKondisizakat,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Keluarga not found" });
    }
  },

  getByHaji: async (req, res, status) => {
    try {
      const keluargas = await Keluarga.find().populate("rumah");
  
      const modifiedKeluargas = keluargas.map((keluarga) => ({
        fotoRumah: keluarga.fotoRumah,
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
        alamat: keluarga.rumah.alamat,
      }));
      const keluargaWithKondisihaji = modifiedKeluargas.filter((keluargaObj) => {
        return keluargaObj.informasiHaji === status;
      });
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluargas: keluargaWithKondisihaji,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Keluarga not found" });
    }
  },

  getByKurban: async (req, res, status) => {
    try {
      const keluargas = await Keluarga.find().populate("rumah");
  
      const modifiedKeluargas = keluargas.map((keluarga) => ({
        fotoRumah: keluarga.fotoRumah,
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
        alamat: keluarga.rumah.alamat,
      }));
      const keluargaWithKondisikurban = modifiedKeluargas.filter((keluargaObj) => {
        return keluargaObj.kurban === status;
      });
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluargas: keluargaWithKondisikurban,
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
        if (req.body.keaktifanShalat !== undefined) {
        rumah.keaktifanShalat = req.body.keaktifanShalat;
      }
      if (req.body.informasiHaji !== undefined) {
        rumah.informasiHaji = req.body.informasiHaji;
      }
      if (req.body.kondisiZakat !== undefined) {
        rumah.kondisiZakat = req.body.kondisiZakat;
      }
      if (req.body.kemampuanBacaQuran !== undefined) {
        rumah.kemampuanBacaQuran = req.body.kemampuanBacaQuran;
      }
      if (req.body.kurban !== undefined) {
        rumah.kurban = req.body.kurban;
      }
      if (req.body.lat !== undefined) {
        rumah.lat = req.body.lat;
      }
      if (req.body.lng !== undefined) {
        rumah.lng = req.body.lng;
      }
      if (req.body.alamat !== undefined) {
        rumah.alamat = req.body.alamat;
      }
  
      await rumah.save();
  
      res.status(200).json({
        message: 'Rumah updated successfully',
        rumah: rumah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Rumah failed to update' });
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
        message: 'Rumah failed to delete',
      });
    }
  },
  count: async (req, res) => {
    try {
      const count = await Rumah.countDocuments();
      res.status(200).json({
        message: "Number of Rumahs fetched successfully",
        count: count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  countKurbanZakatHaji : async (req, res) => {
    try {
      const kurbanCount = await Rumah.countDocuments({ kurban: true });
      const zakatCount = await Rumah.countDocuments({ kondisiZakat: true });
      const hajiCount = await Rumah.countDocuments({ informasiHaji: true });
      const totalRumahCount = await Rumah.countDocuments();
  
      res.json({
        kurban: kurbanCount,
        zakat: zakatCount,
        haji: hajiCount,
        JumlahRumah: totalRumahCount, // Change the field name here
      });
    } catch (error) {
      console.error('Error counting kurban, zakat, and haji:', error);
      res.status(500).json({ message: 'Error counting kurban, zakat, and haji.' });
    }
  }
};  

module.exports = rumahController;
