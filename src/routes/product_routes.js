const router = require('express').Router();
const ProductModel = require('./../models/product_model');

router.get("/", async function(req, res) {
    await ProductModel.find().populate('category').exec(function(err, products) {
        if(err) {
            res.json({ success: false, error: err });
            return;
        }

        res.json({ success: true, data: products });
    });
});

router.post("/", async function(req, res) {
    const productData = req.body;
    const newProduct = new ProductModel(productData);
    await newProduct.save(function(err) {
        if(err) {
            res.json({ success: false, error: err });
            return;
        }

        res.json({ success: true, data: newProduct });
    });
});

router.delete("/", async function(req, res) {
    const productid = req.body.productid;
    const result = await ProductModel.findOneAndDelete({ productid: productid });

    if(!result) {
        res.json({ success: false, error: "product-not-found" });
        return;
    }

    res.json({ success: true, data: result });
});

module.exports = router;