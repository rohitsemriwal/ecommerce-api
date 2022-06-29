const router = require('express').Router();
const UserModel = require('./../models/user_model');
const bcrypt = require('bcrypt');

router.post("/createaccount", async function(req, res) {
    const userData = req.body;

    // Encrypt(Hash) the password
    const password = userData.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    userData.password = hashedPassword;

    const newUser = new UserModel(userData);
    await newUser.save(function(err) {
        if(err) {
            res.json({ success: false, error: err });
            return;
        }

        res.json({ success: true, data: newUser });
    });
});

module.exports = router;