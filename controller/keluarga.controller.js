const Keluarga = require("../models/keluarga");
const Rumah = require("../models/rumah");
const validator = require("../validator/validator");

const keluargaController = {
  create: async (req, res) => {
    const { rumah, kepalaKeluarga, anggotaKeluarga, fotoRumah } = req.body;

    try {
      // Check if the rumah exists
      const existingRumah = await Rumah.findById(rumah);
      if (!existingRumah) {
        return res.status(404).json({ message: "Rumah not found" });
      }

      // Check if the rumah already has a keluarga
      const existingKeluarga = await Keluarga.findOne({ rumah });
      if (existingKeluarga) {
        return res
          .status(400)
          .json({ message: "Keluarga already exists for this rumah" });
      }

      // Create the keluarga document
      const keluarga = new Keluarga({
        rumah,
        kepalaKeluarga,
        anggotaKeluarga,
        fotoRumah,
      });

      const newKeluarga = await keluarga.save();

      res.status(201).json({
        message: "Keluarga created successfully",
        keluarga: newKeluarga,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAll: async (req, res) => {
    try {
      const keluargas = await Keluarga.find();

      res.status(200).json({
        message: "Keluargas fetched successfully",
        keluargas: keluargas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      // Find the Rumah model based on the provided rumahId
      const rumah = await Rumah.findById(req.params.id);
  
      if (!rumah) {
        res.status(404).json({ message: "Rumah not found" });
        return;
      }
  
      // Find the Keluarga associated with the found Rumah
      const keluarga = await Keluarga.findOne({ rumah: req.params.id });
  
      if (!keluarga) {
        res.status(404).json({ message: "Keluarga not found for the given Rumah ID" });
        return;
      }
  
      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluarga: keluarga,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching Keluarga" });
    }
  },
  

  update: async (req, res) => {
    try {
      // Find the Rumah model based on the provided rumahId
      const rumah = await Rumah.findById(req.params.id);
  
      if (!rumah) {
        res.status(404).json({ message: "Rumah not found" });
        return;
      }
  
      // Find the Keluarga associated with the found Rumah
      const keluarga = await Keluarga.findOne({ rumah: req.params.id });
  
      if (!keluarga) {
        res.status(404).json({ message: "Keluarga not found for the given Rumah ID" });
        return;
      }
  
      // Update the fields individually
      if (req.body.kepalaKeluarga) {
        keluarga.kepalaKeluarga = req.body.kepalaKeluarga;
      }
      if (req.body.anggotaKeluarga) {
        keluarga.anggotaKeluarga = req.body.anggotaKeluarga;
      }
      if (req.body.fotoRumah) {
        keluarga.fotoRumah = req.body.fotoRumah;
      }
  
      const updatedKeluarga = await keluarga.save();
  
      res.status(200).json({
        message: "Keluarga updated successfully",
        keluarga: updatedKeluarga,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
  
  

  delete: async (req, res) => {
    try {
      // Find the Rumah model based on the provided rumahId
      const rumah = await Rumah.findById(req.params.id);
  
      if (!rumah) {
        res.status(404).json({ message: "Rumah not found" });
        return;
      }
  
      // Find and delete the Keluarga associated with the found Rumah
      const keluarga = await Keluarga.findOneAndDelete({ rumah: req.params.id });
  
      if (!keluarga) {
        res.status(404).json({ message: "Keluarga not found for the given Rumah ID" });
        return;
      }
  
      res.status(200).json({
        message: "Keluarga deleted successfully",
        keluarga: keluarga,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },  
};

module.exports = keluargaController;
