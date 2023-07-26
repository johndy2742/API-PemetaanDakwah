const express =require('express')
const userController = require('../controller/user.controller')
const router = express.Router()
const passport = require('passport');
const keluargaController = require('../controller/keluarga.controller');
const rumahController = require('../controller/rumah.controller');
const petaDakwahController = require('../controller/petaDakwah.controller');
const masjidController = require('../controller/masjid.controller');

// user route

// user route
router.post("/api/login", userController.login)
router.get("/api/user",passport.authenticate("jwt", { session: false }) , userController.getAll)
router.post("/api/user/create", passport.authenticate("jwt", { session: false }), userController.create)
router.get("/api/user/:id", passport.authenticate("jwt", { session: false }), userController.getById)
router.put("/api/user/:id", passport.authenticate("jwt", { session: false }), userController.update)
router.delete("/api/user/:id", passport.authenticate("jwt", { session: false }), userController.delete)

// keluarga route
router.post("/api/keluarga/create", passport.authenticate("jwt", { session: false }), keluargaController.create)
router.get("/api/keluarga", passport.authenticate("jwt", { session: false }), keluargaController.getAll)
router.get("/api/keluarga/:id", passport.authenticate("jwt", { session: false }), keluargaController.getById)
router.put("/api/keluarga/:id", passport.authenticate("jwt", { session: false }), keluargaController.update)
router.delete("/api/keluarga/:id", passport.authenticate("jwt", { session: false }), keluargaController.delete)

//rumah route
router.post("/api/rumah/create", passport.authenticate("jwt", { session: false }), rumahController.create)
router.get("/api/rumah", passport.authenticate("jwt", { session: false }), rumahController.getAll)
router.get("/api/rumah/:id", passport.authenticate("jwt", { session: false }), rumahController.getById)
router.put("/api/rumah/:id", passport.authenticate("jwt", { session: false }), rumahController.update)
router.delete("/api/rumah/:id", passport.authenticate("jwt", { session: false }), rumahController.delete)
router.get("/api/rumah/zakat/true", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const status = true;
    await rumahController.getByZakat(req, res, status); 
  })

router.get("/api/rumah/zakat/false", passport.authenticate("jwt", { session: false }), async (req, res) => {
        const status = false;
        await rumahController.getByZakat(req, res, status); 
    })

router.get("/api/rumah/haji/true", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const status = true;
    await rumahController.getByHaji(req, res, status); 
  })

router.get("/api/rumah/haji/false", passport.authenticate("jwt", { session: false }), async (req, res) => {
        const status = false;
        await rumahController.getByHaji(req, res, status); 
    })  

router.get("/api/rumah/kurban/true", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const status = true;
    await rumahController.getByKurban(req, res, status); 
  })

router.get("/api/rumah/kurban/false", passport.authenticate("jwt", { session: false }), async (req, res) => {
        const status = false;
        await rumahController.getByKurban(req, res, status); 
    })

    
// petaDakwah route
router.post("/api/petaDakwah/create", passport.authenticate("jwt", { session: false }), petaDakwahController.create);
router.get("/api/petaDakwah", passport.authenticate("jwt", { session: false }), petaDakwahController.getAll);
router.get("/api/petaDakwah/:id", passport.authenticate("jwt", { session: false }), petaDakwahController.getById);
router.put("/api/petaDakwah/:id", passport.authenticate("jwt", { session: false }), petaDakwahController.update);
router.delete("/api/petaDakwah/:id", passport.authenticate("jwt", { session: false }), petaDakwahController.delete);
router.get("/api/petaDakwah/filter/date", passport.authenticate("jwt", { session: false }), petaDakwahController.getPetaDakwahByDate);
router.get("/api/petaDakwah/filter/kategori", passport.authenticate("jwt", { session: false }), petaDakwahController.getPetaDakwahByKategori);
router.get("/api/petaDakwah/filter/location", passport.authenticate("jwt", { session: false }), petaDakwahController.getPetaDakwahByLocation);

// masjid route
router.post("/api/masjid/create", passport.authenticate("jwt", { session: false }), masjidController.create);
router.get("/api/masjid", passport.authenticate("jwt", { session: false }), masjidController.getAll);
router.get("/api/masjid/:id", passport.authenticate("jwt", { session: false }), masjidController.getById);
router.put("/api/masjid/:id", passport.authenticate("jwt", { session: false }), masjidController.update);
router.delete("/api/masjid/:id", passport.authenticate("jwt", { session: false }), masjidController.delete);

//Non Token Get
router.get("/api/admin/user",userController.getAll)
router.get("/api/admin/user/:id",userController.getById)
router.get("/api/admin/keluarga",keluargaController.getAll)
router.get("/api/admin/keluarga/:id",keluargaController.getById)
router.get("/api/admin/rumah",rumahController.getAll)
router.get("/api/admin/rumah/:id",rumahController.getById)



module.exports = router