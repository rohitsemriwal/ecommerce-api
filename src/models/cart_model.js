const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    cartid: { type: String, required: true, unique: true },
    userid: { type: String, required: true },
    items: { type: [{ type: Schema.Types.ObjectId, ref: "CartItem" }], default: [] }
});

const cartModel = model("Cart", cartSchema);

module.exports = cartModel;