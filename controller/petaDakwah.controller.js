const PetaDakwah = require('../models/PetaDakwah');
const Masjid = require('../models/masjid');

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
      createdAt,
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
        createdAt,
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
      const { startDate, endDate } = req.query;
  
      let query = {};
      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
  
      const petaDakwahs = await PetaDakwah.find(query).populate("masjidId");
      res.status(200).json({
        message: "PetaDakwahs fetched successfully",
        petaDakwahs: petaDakwahs,
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
        petaDakwah: petaDakwah,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update a specific PetaDakwah document by ID
  update: async (req, res) => {
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
      const petaDakwah = await PetaDakwah.findByIdAndUpdate(
        req.params.id,
        {
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
        petaDakwahs: petaDakwahData,
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
        petaDakwahs: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to filter PetaDakwah data by kategori" });
    }
  },

  getPetaDakwahByMasjid : async (req, res) => {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ message: "Masjid ID is required" });
      }
  
      const petaDakwah = await PetaDakwah.find({ masjidId: id }).populate("masjidId");

  
      if (petaDakwah.length === 0) {
        return res.status(404).json({ message: "No PetaDakwah data found for the specified masjid ID" });
      }
  
      res.status(200).json({
        message: "PetaDakwah data fetched successfully by masjid ID",
        petaDakwahs: petaDakwah,
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
        petaDakwahs: petaDakwahData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch PetaDakwah data without masjid association" });
    }
  },
  
  async count(req, res) {
    try {
      const { startDate, endDate } = req.query;
      let query = {};
  
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
  
        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
          return res.status(400).json({
            message: "Invalid date format. Please use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)",
          });
        }
  
        query.createdAt = {
          $gte: startDateObj,
          $lte: endDateObj,
        };
      }
  
      const count = await PetaDakwah.countDocuments(query);
  
      res.status(200).json({
        message: "Number of Dakwah fetched successfully",
        count: count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  

  countbymonth: async (req, res) => {
    try {
      const { month } = req.query;

      let filter = {};
      if (month) {
        // Assuming the date field in the PetaDakwah schema is called "waktuMulai"
        filter = {
          waktuMulai: {
            $gte: new Date(`${month}-01T00:00:00.000Z`),
            $lt: new Date(`${month}-01T00:00:00.000Z`).setMonth(new Date(`${month}-01T00:00:00.000Z`).getMonth() + 1),
          },
        };
      }

      const count = await PetaDakwah.countDocuments(filter);
      res.status(200).json({
        message: "Number of Dakwah fetched successfully",
        count: count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = petaDakwahController;
