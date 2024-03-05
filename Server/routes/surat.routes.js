const { Router } = require("express");
const router = Router();
const authentication = require("../middlewares/authentication");
const isAdmin = require("../middlewares/isAdmin");
const { getAll, getById, createSurat, updateSurat, deleteSurat, TolakSurat, konfirmasiSurat, getAllUncheckedSurat } = require("../controllers/surat.controller");

router.get("/surat", getAll);
router.get("/check", getAllUncheckedSurat);
router.put("/konfirmasi/:id(\\d+)", konfirmasiSurat);
router.put("/tolak/:id(\\d+)", TolakSurat);
router.get("/surat/:id(\\d+)", getById);
router.post("/surat", createSurat);
router.put("/surat/:id(\\d+)", updateSurat);
router.delete("/surat/:id(\\d+)", deleteSurat);

module.exports = router;
