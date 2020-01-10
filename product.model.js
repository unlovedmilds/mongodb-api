const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

    name: String,
    email: String,
    age: Number

}, {
    timestamps: true
});


module.exports = mongoose.model('product', ProductSchema);