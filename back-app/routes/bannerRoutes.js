const express = require("express");
const router = express.Router()
const {getBanner , createBanner } = require("../controllers/bannerController")



router.post("/", createBanner);
router.get("/",getBanner)

module.exports = router