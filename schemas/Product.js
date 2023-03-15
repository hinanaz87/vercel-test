const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{type:String, required: true },
    productDescription:{type:String, required: true },
    productPrice:{type:Number, required: true },
    productCategory:{type:String, required: true },
    isApproved:{type:Boolean, defalut: false },
    // picture:{type:String, required: true },
    shopName:{type:String, required: true },
    userId:{type:String, },
    productImage:{type:String, required: true },


    createdOn:{type:Date, default:Date.now },
})

module.exports = mongoose.model("Product", productSchema)