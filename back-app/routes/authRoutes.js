const express = require("express")
const {register} = require("../controllers/authController")
const {login} =require("../controllers/login")
const {profile} = require("../controllers/profile")
const {authMiddleware} = require("../Middleware/authMiddleware")

const router = express.Router();
router.post("/register",register )
router.post("/login",login)
router.get("/profile",authMiddleware,profile)

module.exports = router