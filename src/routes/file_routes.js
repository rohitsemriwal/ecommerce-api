const router = require('express').Router();
const upload = require('./../middlewares/file_upload');

router.post("/single", upload.single('image'), async function(req, res) {
    const uploadedFile = req.file;

    if(!uploadedFile) {
        res.json({ success: false, error: "file-not-uploaded" });
        return;
    }

    res.json({ success: true, data: "http://localhost:5000/" + uploadedFile.filename });
});

module.exports = router;