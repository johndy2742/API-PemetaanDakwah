const Keluarga = require("../models/keluarga");
const Rumah = require("../models/rumah");
const validator = require("../validator/validator")

  const keluargaController = {
    create: async (req, res) => {
      const { rumah, kepalaKeluarga, anggotaKeluarga } = req.body;
  
      try {
        // Check if the rumah exists
        const existingRumah = await Rumah.findById(rumah);
        if (!existingRumah) {
          return res.status(404).json({ message: "Rumah not found" });
        }
  
        // Check if the rumah already has a keluarga
        const existingKeluarga = await Keluarga.findOne({ rumah });
        if (existingKeluarga) {
          return res.status(400).json({ message: "Keluarga already exists for this rumah" });
        }
  
        // Create the keluarga document
        const keluarga = new Keluarga({
          rumah,
          kepalaKeluarga,
          anggotaKeluarga,
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
      const keluarga = await Keluarga.findById(req.params.id);

      if (!keluarga) {
        res.status(404).json({ message: "Keluarga not found" });
        return;
      }

      res.status(200).json({
        message: "Keluarga fetched successfully",
        keluarga: keluarga,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Keluarga not found" });
    }
  },

  update: async (req, res) => {
    try {
      const keluarga = await Keluarga.findById(req.params.id);
  
      if (!keluarga) {
        res.status(404).json({ message: "Keluarga not found" });
        return;
      }  
      keluarga.anggotaKeluarga = req.body.anggotaKeluarga;
  
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
      const keluarga = await Keluarga.findByIdAndDelete(req.params.id);
  
      if (!keluarga) {
        res.status(404).json({ message: "Keluarga not found" });
        return;
      }
  
      res.status(200).json({ message: "Keluarga deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Keluarga not found" });
    }
  },
}  
module.exports = keluargaController;
