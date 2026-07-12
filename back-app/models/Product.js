const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type: String,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String, // هنحط URL للصورة
        required: true,
    },
    minImage:{
        type: String, // هنحط URL للصورة
  
    },
    
    stock:{
        type: Number,
        default: 0,
    },
    sold:{
        type:Number,
        default:0,
    }

},
{ timestamps: true }
)
module.exports = mongoose.model("Product",productSchema)