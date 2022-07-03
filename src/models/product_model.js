const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    styles: { type: Array, default: [] },
    price: { type: Number, required: true },
    images: { type: Array, default: [] },
    createdon: { type: Date, default: Date.now }
});

const productModel = model("Product", productSchema);

module.exports = productModel;