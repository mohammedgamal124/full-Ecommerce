const express = require("express");
const router = express.Router();
const{  createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getBestSelling,
    getProductById
  } = require("../controllers/ProductController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/best-selling",getBestSelling)
router.get("/:id", getProductById)
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;