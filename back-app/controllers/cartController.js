const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }
        const product = await Product.findById(productId);;
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
            
            const userId = req.user.id;
            console.log(req.user);
            console.log("User ID:", userId);
            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({
                    user: userId,
                    items: [],
                });
            }
            // 6. Check if product already exists in cart
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // Product already exists → increase quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Product doesn't exist → add it
                cart.items.push({
                    product: product._id,
                    quantity,
                    price: product.price,
                });
            }

            // 7. Save cart
            await cart.save();

            res.status(200).json({
                message: "Product added to cart successfully",
                cart,
            });

        


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
const getCart = async(req,res) => {
    try{
        const userId = req.user.id;
        const cart = await Cart.findOne({user:userId}).populate("items.product");
        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }
        res.status(200).json({ cart });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    addToCart,
    getCart
}
