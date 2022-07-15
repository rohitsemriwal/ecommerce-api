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

router.post("/multiple", upload.array('images', 10), async function(req, res) {
    const uploadedFiles = req.files;

    if(!uploadedFiles || uploadedFiles.length == 0) {
        res.json({ success: false, error: "files-not-uploaded" });
        return;
    }

    var downloadurls = [];
    uploadedFiles.forEach(function(uploadedFile) {
        const downloadurl = "http://localhost:5000/" + uploadedFile.filename;
        downloadurls.push(downloadurl);
    });

    res.json({ success: true, data: downloadurls });
});

module.exports = router;