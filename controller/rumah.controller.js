const Rumah = require('../models/rumah');
const Keluarga = require('../models/keluarga');

const rumahController = {
  create: async (req, res) => {
    try {
      const rumah = await Rumah.create(req.body);
      res.status(201).json(rumah);
    } catch (error) {
      res.status(500).json({ error: "Failed to create Rumah." });
    }
  },

  getAll: async (req, res) => {
    try {
      const rumahs = await Rumah.find();
      res.status(200).json(rumahs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Rumahs." });
    }
  },

  getById: async (req, res) => {
    try {
      const rumah = await Rumah.findById(req.params.id);
      if (!rumah) {
        res.status(404).json({ message: "Rumah not found" });
        return;
      }
      res.status(200).json(rumah);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Rumah." });
    }
  },

  update: async (req, res) => {
    try {
      const rumah = await Rumah.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!rumah) {
        res.status(404).json({ message: "Rumah not found" });
        return;
      }
      res.status(200).json(rumah);
    } catch (error) {
      res.status(500).json({ error: "Failed to update Rumah." });
    }
  },

  delete: async (req, res) => {
    try {
      const rumah = await Rumah.findByIdAndDelete(req.params.id);
      if (!rumah) {
        res.status(404).json({ message: "Rumah not found" });
        return;
      }
      // Delete associated Keluarga documents
      await Keluarga.deleteMany({ rumah: rumah._id });
      res.status(200).json({ message: "Rumah deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Rumah." });
    }
  },

  getByZakat: async (req, res) => {
    try {
      const status = req.params.status;
      const keluargas = await Keluarga.find({ "rumah.kondisiZakat": status }).populate("rumah");
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluargas: keluargas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Keluarga not found" });
    }
  },

  getByHaji: async (req, res) => {
    try {
      const status = req.params.status;
      const keluargas = await Keluarga.find({ "rumah.informasiHaji": status }).populate("rumah");
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluargas: keluargas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Keluarga not found" });
    }
  },

  getByKurban: async (req, res) => {
    try {
      const status = req.params.status;
      const keluargas = await Keluarga.find({ "rumah.kurban": status }).populate("rumah");
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluargas: keluargas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Keluarga not found" });
    }
  },
};

module.exports = rumahController;
