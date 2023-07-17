const express =require('express')
const userController = require('../controller/user.controller')
const router = express.Router()
const passport = require('passport');
const keluargaController = require('../controller/keluarga.controller');
const rumahController = require('../controller/rumah.controller');

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


//Non Token Get
router.get("/api/admin/user",userController.getAll)
router.get("/api/admin/user/:id",userController.getById)
router.get("/api/admin/keluarga",keluargaController.getAll)
router.get("/api/admin/keluarga/:id",keluargaController.getById)
router.get("/api/admin/rumah",rumahController.getAll)
router.get("/api/admin/rumah/:id",rumahController.getById)



module.exports = router