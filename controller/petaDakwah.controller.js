const PetaDakwah = require('../models/PetaDakwah');

const petaDakwahController = {
  // Create a new PetaDakwah document
  create: async (req, res) => {
    const {
      masjidId,
      lat,
      lng,
      pembicara,
      topikDakwah,
      kategori,
      gelar_pembicara,
      asal_instansi_pembicara,
      foto,
      waktuMulai,
      waktuAkhir,
      tipe_kegiatan,
      nama_penyelenggara,
      alamat_penyelenggara,
      penanggung_jawab,
      no_hp_penyelenggara,
    } = req.body;

    try {
      // Create the petaDakwah document
      const petaDakwah = new PetaDakwah({
        masjidId,
        lat,
        lng,
        pembicara,
        topikDakwah,
        kategori,
        gelar_pembicara,
        asal_instansi_pembicara,
        foto,
        waktuMulai,
        waktuAkhir,
        tipe_kegiatan,
        nama_penyelenggara,
        alamat_penyelenggara,
        penanggung_jawab,
        no_hp_penyelenggara,
      });

      const newPetaDakwah = await petaDakwah.save();

      res.status(201).json({
        message: "PetaDakwah created successfully",
        data: newPetaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get all PetaDakwah documents
  getAll: async (req, res) => {
    try {
      const petaDakwahs = await PetaDakwah.find().populate("masjidId");
      res.status(200).json({
        message: "PetaDakwahs fetched successfully",
        petadakwah: petaDakwahs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get a specific PetaDakwah document by ID
  getById: async (req, res) => {
    try {
      const petaDakwah = await PetaDakwah.findById(req.params.id).populate("masjidId");
      if (!petaDakwah) {
        return res.status(404).json({ message: "PetaDakwah not found" });
      }
      res.status(200).json({
        message: "PetaDakwah fetched successfully",
        petadakwah: petaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update a specific PetaDakwah document by ID
  update: async (req, res) => {
    const {
      lat,
      lng,
      pembicara,
      topikDakwah,
      kategori,
      gelar_pembicara,
      asal_instansi_pembicara,
      foto,
      waktuMulai,
      waktuAkhir,
      tipe_kegiatan,
      nama_penyelenggara,
      alamat_penyelenggara,
      penanggung_jawab,
      no_hp_penyelenggara,
    } = req.body;

    try {
      const petaDakwah = await PetaDakwah.findByIdAndUpdate(
        req.params.id,
        {
          lat,
          lng,
          pembicara,
          topikDakwah,
          kategori,
          gelar_pembicara,
          asal_instansi_pembicara,
          foto,
          waktuMulai,
          waktuAkhir,
          tipe_kegiatan,
          nama_penyelenggara,
          alamat_penyelenggara,
          penanggung_jawab,
          no_hp_penyelenggara,
        },
        { new: true }
      );

      if (!petaDakwah) {
        return res.status(404).json({ message: "PetaDakwah not found" });
      }

      res.status(200).json({
        message: "PetaDakwah updated successfully",
        data: petaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Delete a specific PetaDakwah document by ID
  delete: async (req, res) => {
    try {
      const petaDakwah = await PetaDakwah.findByIdAndDelete(req.params.id);
      if (!petaDakwah) {
        return res.status(404).json({ message: "PetaDakwah not found" });
      }
      res.status(200).json({
        message: "PetaDakwah deleted successfully",
        data: petaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
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
      }).populate("masjidId");
  
      res.status(200).json({
        message: "PetaDakwah data filtered successfully",
        petaDakwah: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to filter PetaDakwah data" });
    }
  },

  getPetaDakwahByKategori: async (req, res) => {
    try {
      const { kategori } = req.query;

      // Check if kategori is provided
      if (!kategori) {
        return res.status(400).json({ message: "Kategori parameter is required" });
      }

      // Check if the provided kategori is valid (from the enum list)
      const validKategoriList = ["kehidupan", "ibadah", "keluarga", "remaja", "akhlak", "toleransi", "tauhid"];
      if (!validKategoriList.includes(kategori)) {
        return res.status(400).json({ message: "Not a valid kategori" });
      }

      // populate({
      //   path: "masjidId",
      //   select: "lokasiMasjid",});

      // Perform the query to filter PetaDakwah data based on the kategori
      const petaDakwahData = await PetaDakwah.find({ kategori }).populate("masjidId");

      res.status(200).json({
        message: "PetaDakwah data filtered by kategori successfully",
        petaDakwah: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to filter PetaDakwah data by kategori" });
    }
  },

  getPetaDakwahByMasjid: async (req, res) => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Masjid ID is required" });
      }

      const petaDakwahData = await PetaDakwah.find({ _id: id });

      if (petaDakwahData.length === 0) {
        return res.status(404).json({ message: "No PetaDakwah data found for the specified masjid ID" });
      }

      res.status(200).json({
        message: "PetaDakwah data fetched successfully by masjid ID",
        petaDakwah: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch PetaDakwah data by masjid ID" });
    }
  },
  getAllWithoutMasjid: async (req, res) => {
    try {
      // Your logic to retrieve all PetaDakwah without a masjid association here
      const petaDakwahData = await PetaDakwah.find({ masjidId: null });

      res.status(200).json({
        message: "PetaDakwah data without masjid association fetched successfully",
        petaDakwah: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch PetaDakwah data without masjid association" });
    }
  },
};

module.exports = petaDakwahController;
