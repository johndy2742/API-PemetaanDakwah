const Masjid = require('../models/masjid');

const masjidController = {
  create: async (req, res) => {
    try {
      const { name, location } = req.body;
      const masjid = new Masjid({ name, location });
      await masjid.save();
      res.status(201).json({ message: "Masjid created successfully", masjid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create masjid" });
    }
  },

  getAll: async (req, res) => {
    try {
      const masjids = await Masjid.find();
      res.status(200).json({ message: "Masjids fetched successfully", masjids });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch masjids" });
    }
  },

  getById: async (req, res) => {
    try {
      const masjid = await Masjid.findById(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }
      res.status(200).json({ message: "Masjid fetched successfully", masjid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch masjid" });
    }
  },

  update: async (req, res) => {
    try {
      const { name, location } = req.body;
      const masjid = await Masjid.findByIdAndUpdate(req.params.id, { name, location }, { new: true });
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }
      res.status(200).json({ message: "Masjid updated successfully", masjid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update masjid" });
    }
  },

  delete: async (req, res) => {
    try {
      const masjid = await Masjid.findByIdAndDelete(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }
      res.status(200).json({ message: "Masjid deleted successfully", masjid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete masjid" });
    }
  }
};

module.exports = masjidController;
