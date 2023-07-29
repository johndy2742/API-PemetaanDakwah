const express =require('express')
const userController = require('../controller/user.controller')
const router = express.Router()
const passport = require('passport');
const keluargaController = require('../controller/keluarga.controller');
const rumahController = require('../controller/rumah.controller');
const petaDakwahController = require('../controller/petaDakwah.controller');
const masjidController = require('../controller/masjid.controller');
const uploadcontroller = require('../controller/upload.controller');
const Rumah = require('../models/rumah');

// user route
router.post("/api/login", userController.login)
router.get("/api/user",passport.authenticate("jwt", { session: false }) , userController.getAll)
router.post("/api/user/create", passport.authenticate("jwt", { session: false }), userController.create)
router.get("/api/user/:id",  userController.getById)
router.put("/api/user/:id", passport.authenticate("jwt", { session: false }), userController.update)
router.delete("/api/user/:id", passport.authenticate("jwt", { session: false }), userController.delete)

// keluarga route
router.post("/api/keluarga/create", passport.authenticate("jwt", { session: false }), keluargaController.create)
router.get("/api/keluarga",  keluargaController.getAll)
router.get("/api/keluarga/:id",  keluargaController.getById)
router.put("/api/keluarga/:id", passport.authenticate("jwt", { session: false }), keluargaController.update)
router.delete("/api/keluarga/:id", passport.authenticate("jwt", { session: false }), keluargaController.delete)


//rumah route
router.post("/api/rumah/create", passport.authenticate("jwt", { session: false }), rumahController.create)
router.get("/api/rumah",  rumahController.getAll)
router.get("/api/rumah/:id",  rumahController.getById)
router.put("/api/rumah/:id", passport.authenticate("jwt", { session: false }), rumahController.update)
router.delete("/api/rumah/:id", passport.authenticate("jwt", { session: false }), rumahController.delete)
router.get("/api/graph/rumah",  rumahController.count)
router.get("/api/graph/rumahstats",  rumahController.countKurbanZakatHaji)
    
// petaDakwah route
router.post("/api/petaDakwah/create", passport.authenticate("jwt", { session: false }), petaDakwahController.create);
router.put("/api/petaDakwah/:id", passport.authenticate("jwt", { session: false }), petaDakwahController.update);
router.delete("/api/petaDakwah/:id", passport.authenticate("jwt", { session: false }), petaDakwahController.delete);



// masjid route
router.post("/api/masjid/create", passport.authenticate("jwt", { session: false }), masjidController.create);
router.get("/api/masjid",  masjidController.getAll);
router.get("/api/masjid/:id",  masjidController.getById);
router.put("/api/masjid/:id", passport.authenticate("jwt", { session: false }), masjidController.update);
router.delete("/api/masjid/:id", passport.authenticate("jwt", { session: false }), masjidController.delete);
router.get("/api/graph/masjid",  masjidController.count);

//Non Token Get
router.get("/api/admin/user",userController.getAll)
router.get("/api/admin/user/:id",userController.getById)
router.get("/api/admin/keluarga",keluargaController.getAll)
router.get("/api/admin/keluarga/:id",keluargaController.getById)
router.get("/api/admin/rumah",rumahController.getAll)
router.get("/api/admin/rumah/:id",rumahController.getById)
router.get("/api/rumah/zakat/true", async (req, res) => {
  const status = true;
  await rumahController.getByZakat(req, res, status); 
})

router.get("/api/rumah/zakat/false",async (req, res) => {
      const status = false;
      await rumahController.getByZakat(req, res, status); 
  })

router.get("/api/rumah/haji/true", async (req, res) => {
  const status = true;
  await rumahController.getByHaji(req, res, status); 
})

router.get("/api/rumah/haji/false",  async (req, res) => {
      const status = false;
      await rumahController.getByHaji(req, res, status); 
  })  

router.get("/api/rumah/kurban/true", async (req, res) => {
  const status = true;
  await rumahController.getByKurban(req, res, status); 
})

router.get("/api/rumah/kurban/false", async (req, res) => {
      const status = false;
      await rumahController.getByKurban(req, res, status); 
  })

router.get("/api/petaDakwah/filter/date",  petaDakwahController.getPetaDakwahByDate);
router.get("/api/petaDakwah/filter/kategori", petaDakwahController.getPetaDakwahByKategori);
router.get("/api/petaDakwah/filter/masjid", petaDakwahController.getPetaDakwahByMasjid);
router.get("/api/petaDakwah/filter/withoutmasjid", petaDakwahController.getAllWithoutMasjid);
router.get("/api/petaDakwah", petaDakwahController.getAll);
router.get("/api/petaDakwah/:id", petaDakwahController.getById);
router.get("/api/graph/petaDakwah", petaDakwahController.count);
router.get("/api/graph/petaDakwah/count", petaDakwahController.countbymonth);



// Route for image upload
router.post('/api/upload', uploadcontroller.uploadImage);



module.exports = router;