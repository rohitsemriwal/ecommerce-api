const jsonwebtoken = require('jsonwebtoken');

async function verify(req, res, next) {
    const authtoken = req.headers["auth-token"];
    const userid = req.headers["userid"];

    try {
        const result = await jsonwebtoken.verify(authtoken, "thisismysecretkey");
        if(result.userid == userid) {
            next();
        }
        else {
            res.json({ success: false, error: "access-denied" });
        }
    } catch(ex) {
        res.json({ success: false, error: "access-denied" });
    }
}

module.exports = verify;