const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userid: { type: String, unique: true },
    fullname: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String },

    address: { type: String, default: "" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    pincode: { type: String, default: "" },
    
    addedon: { type: Date, default: Date.now }
});

const userModel = model("User", userSchema);

module.exports = userModel;