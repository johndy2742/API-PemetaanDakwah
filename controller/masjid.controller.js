const mongoose = require("mongoose");
const Masjid = require("../models/masjid");

const masjidController = {
  // Create a new Masjid
  async create(req, res) {
    try {
      const newMasjid = await Masjid.create(req.body);
      res.status(201).json(newMasjid);
    } catch (error) {
      res.status(500).json({ error: "Failed to create Masjid." });
    }
  },

  // Get all Masjids
  getAll: async (req, res) => {
    try {
      const masjids = await Masjid.find();
      res.status(200).json({
        message: "Masjids fetched successfully",
        masjids: masjids,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get a single Masjid by ID
  async getById(req, res) {
    try {
      const masjid = await Masjid.findById(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found." });
      }
      res.status(200).json(masjid);
    } catch (error) {
      res.status(500).json({ error: "Failed to get Masjid." });
    }
  },

  // Update a Masjid by ID
  async update(req, res) {
    try {
      const updatedMasjid = await Masjid.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedMasjid) {
        return res.status(404).json({ message: "Masjid not found." });
      }
      res.status(200).json(updatedMasjid);
    } catch (error) {
      res.status(500).json({ error: "Failed to update Masjid." });
    }
  },

  // Delete a Masjid by ID
  async delete(req, res) {
    try {
      const deletedMasjid = await Masjid.findByIdAndRemove(req.params.id);
      if (!deletedMasjid) {
        return res.status(404).json({ message: "Masjid not found." });
      }
      res.status(200).json({ message: "Masjid deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Masjid." });
    }
  },
};

module.exports = masjidController;
