const router = require('express').Router();
const UserModel = require('./../models/user_model');
const bcrypt = require('bcrypt');

router.get("/:userid", async function(req, res) {
    const userid = req.params.userid;
    const foundUser = await UserModel.findOne({ userid: userid });
    if(!foundUser) {
        res.json({ success: false, error: "user-not-found" });
        return;
    }

    res.json({ success: true, data: foundUser });
});

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

router.post("/login", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const foundUser = await UserModel.findOne({ email: email });
    if(!foundUser) {
        res.json({ success: false, error: "user-not-found" });
        return;
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);
    if(!correctPassword) {
        res.json({ success: false, error: "incorrect-password" });
        return;
    }

    res.json({ success: true, data: foundUser });
});

module.exports = router;