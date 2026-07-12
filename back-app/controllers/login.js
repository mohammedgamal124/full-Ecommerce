
const bcrypt = require("bcrypt");
const User = require("../models/user")
 const jwt = require("jsonwebtoken");

const login = async (req,res) => {
    try {
        const {email , password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message:"Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password ,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
     
        const token = jwt.sign(
            { id: user._id, },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({
            message: "Login successful",
            token,
            user,
          });
        
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
          });
    }

}

module.exports ={
login
}