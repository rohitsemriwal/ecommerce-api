const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema({
    cartitemid: { type: String, required: true, unique: true },
    cartid: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    style: { type: Schema.Types.ObjectId, ref: "ProductStyle" },
    addedon: { type: Date, default: Date.now }
});

const cartItemModel = model("CartItem", cartItemSchema);

module.exports = cartItemModel;