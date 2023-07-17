const PetaDakwah = require("../models/PetaDakwah");

const petaDakwahController = {
  create: async (req, res) => {
    const { pembicara, topikDakwah, lat, lng, waktuMulai, waktuAkhir } = req.body;

    try {
      const newPetaDakwah = new PetaDakwah({
        pembicara,
        topikDakwah,
        lat,
        lng,
        waktuMulai,
        waktuAkhir,
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

      const { pembicara, topikDakwah, lat, lng, waktuMulai, waktuAkhir } = req.body;

      petaDakwah.pembicara = pembicara;
      petaDakwah.topikDakwah = topikDakwah;
      petaDakwah.lat = lat;
      petaDakwah.lng = lng;
      petaDakwah.waktuMulai = waktuMulai;
      petaDakwah.waktuAkhir = waktuAkhir;

      const updatedPetaDakwah = await petaDakwah.save();

      res.status(200).json({
        message: "Peta Dakwah updated successfully",
        petaDakwah: updatedPetaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Peta Dakwah Not found" });
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
      res.status(500).json({ message: "Peta Dakwah not found" });
    }
  },
};

module.exports = petaDakwahController;
