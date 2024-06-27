const mongoose = require("mongoose")

const cart = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.ObjectId,
        ref: 'products',
        required:true
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required:true
    },
    count:{
        type:Number,
        min:1, 
    },
   

})

module.exports = new mongoose.model('Cart',product);