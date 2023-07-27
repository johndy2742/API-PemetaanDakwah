const PetaDakwah = require("../models/PetaDakwah");

const petaDakwahController = {
  create: async (req, res) => {
    const { pembicara, topikDakwah, lat, lng, waktuMulai, waktuAkhir, kategori, foto } = req.body;

    try {
      const newPetaDakwah = new PetaDakwah({
        pembicara,
        topikDakwah,
        lat,
        lng,
        waktuMulai,
        waktuAkhir,
        kategori,
        foto,
      });

      const savedPetaDakwah = await newPetaDakwah.save();

      res.status(201).json({
        message: "Peta Dakwah created successfully",
        petaDakwah: savedPetaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create Peta Dakwah" });
    }
  },

  getAll: async (req, res) => {
    try {
      const petaDakwahs = await PetaDakwah.find();

      res.status(200).json({
        message: "Peta Dakwahs fetched successfully",
        petaDakwahs: petaDakwahs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Peta Dakwah Not found" });
    }
  },

  getById: async (req, res) => {
    try {
      const petaDakwah = await PetaDakwah.findById(req.params.id);

      if (!petaDakwah) {
        res.status(404).json({ message: "Peta Dakwah not found" });
        return;
      }

      res.status(200).json({
        message: "Peta Dakwah fetched successfully",
        petaDakwah: petaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Peta Dakwah Not found" });
    }
  },

  update: async (req, res) => {
    try {
      const petaDakwah = await PetaDakwah.findById(req.params.id);

      if (!petaDakwah) {
        res.status(404).json({ message: "Peta Dakwah not found" });
        return;
      }

      const { pembicara, topikDakwah, lat, lng, waktuMulai, waktuAkhir, kategori, foto} = req.body;

      petaDakwah.pembicara = pembicara;
      petaDakwah.topikDakwah = topikDakwah;
      petaDakwah.lat = lat;
      petaDakwah.lng = lng;
      petaDakwah.waktuMulai = waktuMulai;
      petaDakwah.waktuAkhir = waktuAkhir;
      petaDakwah.kategori = kategori;
      petaDakwah.foto = foto;

      const updatedPetaDakwah = await petaDakwah.save();

      res.status(200).json({
        message: "Peta Dakwah updated successfully",
        petaDakwah: updatedPetaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Peta failed to update" });
    }
  },

  delete: async (req, res) => {
    try {
      const petaDakwah = await PetaDakwah.findByIdAndDelete(req.params.id);

      if (!petaDakwah) {
        res.status(404).json({ message: "Peta Dakwah not found" });
        return;
      }

      res.status(200).json({ message: "Peta Dakwah deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Peta Dakwah failed to delete" });
    }
  },

  getPetaDakwahByDate : async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      // Check if startDate and endDate are provided
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Both startDate and endDate are required" });
      }
  
      // Convert the date strings to actual Date objects
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
  
      // Check if the date conversion is successful
      if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Please use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)" });
      }
  
      // Perform the query to filter PetaDakwah data based on the date range
      const petaDakwahData = await PetaDakwah.find({
        waktuMulai: { $gte: startDateObj, $lte: endDateObj },
      });
  
      res.status(200).json({
        message: "PetaDakwah data filtered successfully",
        petaDakwah: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to filter PetaDakwah data" });
    }
  },

  getPetaDakwahByKategori : async (req, res) => {
    try {
      const { kategori } = req.query;
  
      // Check if kategori is provided
      if (!kategori) {
        return res.status(400).json({ message: "Kategori parameter is required" });
      }
  
      // Perform the query to filter PetaDakwah data based on the kategori
      const petaDakwahData = await PetaDakwah.find({ kategori });
  
      res.status(200).json({
        message: "PetaDakwah data filtered by kategori successfully",
        petaDakwah: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to filter PetaDakwah data by kategori" });
    }
  },

  getPetaDakwahByLocation : async (req, res) => {
    try {
      const { lat, lng } = req.query;
  
      if (!lat || !lng) {
        return res.status(400).json({ message: "Both lat and lng are required" });
      }
  
      const petaDakwahData = await PetaDakwah.find({ lat, lng });
  
      if (petaDakwahData.length === 0) {
        return res.status(404).json({ message: "No PetaDakwah data found for the specified location" });
      }
  
      res.status(200).json({
        message: "PetaDakwah data filtered successfully",
        petaDakwah: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to filter PetaDakwah data" });
    }
  }
  
};

module.exports = petaDakwahController;
