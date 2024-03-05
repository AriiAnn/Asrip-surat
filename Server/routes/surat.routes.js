const { Router } = require("express");
const router = Router();
const authentication = require("../middlewares/authentication");
const isAdmin = require("../middlewares/isAdmin");
const { getAll, getById, createSurat, updateSurat, deleteSurat, TolakSurat, konfirmasiSurat, getAllUncheckedSurat, getUncheckedSuratById } = require("../controllers/surat.controller");

router.get("/surat", getAll);
router.get("/check", getAllUncheckedSurat);
router.get("/check/:id", getUncheckedSuratById);
router.put("/konfirmasi/:id", konfirmasiSurat);
router.put("/tolak/:id", TolakSurat);
router.get("/surat/:id", getById);
router.post("/surat", createSurat);
router.put("/surat/:id", updateSurat);
router.delete("/surat/:id", deleteSurat);

module.exports = router;
