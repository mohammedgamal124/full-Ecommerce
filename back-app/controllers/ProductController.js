const Product = require("../models/Product");

// add product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
        message:"Product created",
        product
    })

} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
};


// 📦 Get All Products
const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

    const getProductById = async (req , res )=>{
      try {
        const product = await Product.findById(req.params.id);

        if(!product){
          return res.status(404).json({
            message:"product not found",
          })
        }
        res.status(200).json(product)
      } catch (error) {
        res.status(500).json({
          message:error.message
        })
      }
    }
    const getBestSelling = async (req, res) => {
      try {
          const products = await Product.find()
              .sort({ sold: -1 })
              .limit(8);
          return res.status(200).json(products);
      } catch (error) {
          return res.status(500).json({ message: error.message });
      }
  };
  
  // ❌ Delete Product
  const deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: "Product deleted" }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ✏️ Update Product
  const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.status(200).json({
        message: "Product updated",
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getBestSelling,
    getProductById
  };