const bcrypt = require("bcrypt");
const User = require("../models/user");


const register = async(req , res ) =>{
    
    try {
        const { name, email, password } = req.body;

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Sorry, email already exists"
            });
        }
        const hashpassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password: hashpassword,
        })
        res.status(201).json({
            message:"create user sccussful",
            user
        })

    } catch (error) {
        console.log("ERROR 🔥:", error);

  return res.status(500).json({
    message: "An error occurred during registration",
    error: error.message,
  });
    }
}
module.exports = {
    register,
}