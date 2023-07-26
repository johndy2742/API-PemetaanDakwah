const Masjid = require("../models/masjid");

const masjidController = {
  create: async (req, res) => {
    const { namaMasjid, ketuaDKM, tahunBerdiri, jumlahJamaah, lat, lng } = req.body;

    try {
      const newMasjid = new Masjid({
        namaMasjid,
        ketuaDKM,
        tahunBerdiri,
        jumlahJamaah,
        lokasiMasjid: { lat, lng },
      });

      const savedMasjid = await newMasjid.save();

      res.status(201).json({
        message: "Masjid created successfully",
        masjid: savedMasjid,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create Masjid" });
    }
  },

  getAll: async (req, res) => {
    try {
      const masjids = await Masjid.find();

      res.status(200).json({
        message: "Masjids fetched successfully",
        masjids: masjids,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Masjids not found" });
    }
  },

  getById: async (req, res) => {
    try {
      const masjid = await Masjid.findById(req.params.id);

      if (!masjid) {
        res.status(404).json({ message: "Masjid not found" });
        return;
      }

      res.status(200).json({
        message: "Masjid fetched successfully",
        masjid: masjid,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Masjid not found" });
    }
  },

  update: async (req, res) => {
    try {
      const masjid = await Masjid.findById(req.params.id);

      if (!masjid) {
        res.status(404).json({ message: "Masjid not found" });
        return;
      }

      const { namaMasjid, ketuaDKM, tahunBerdiri, jumlahJamaah, lat, lng } = req.body;

      masjid.namaMasjid = namaMasjid;
      masjid.ketuaDKM = ketuaDKM;
      masjid.tahunBerdiri = tahunBerdiri;
      masjid.jumlahJamaah = jumlahJamaah;
      masjid.lokasiMasjid = { lat, lng };

      const updatedMasjid = await masjid.save();

      res.status(200).json({
        message: "Masjid updated successfully",
        masjid: updatedMasjid,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update Masjid" });
    }
  },

  delete: async (req, res) => {
    try {
      const masjid = await Masjid.findByIdAndDelete(req.params.id);

      if (!masjid) {
        res.status(404).json({ message: "Masjid not found" });
        return;
      }

      res.status(200).json({ message: "Masjid deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete Masjid" });
    }
  },

  getByLocation: async (req, res) => {
    try {
      const { lat, lng } = req.query;

      // Check if lat and lng are provided
      if (!lat || !lng) {
        return res.status(400).json({ message: "Both latitude (lat) and longitude (lng) are required" });
      }

      // Perform the query to find Masjid data based on the lat and lng
      const masjidData = await Masjid.find({
        "lokasiMasjid.lat": lat,
        "lokasiMasjid.lng": lng,
      });

      // Check if any Masjid data is found
      if (masjidData.length === 0) {
        return res.status(404).json({ message: "No Masjid found at the specified location" });
      }

      res.status(200).json({
        message: "Masjid data fetched successfully",
        masjids: masjidData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch Masjid data" });
    }
  },
};

module.exports = masjidController;
