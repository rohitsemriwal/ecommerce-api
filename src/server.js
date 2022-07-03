const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://rohitsemriwal:rr1234@cluster0.fnizk.mongodb.net/ecommerce?retryWrites=true&w=majority").then(function() {

    app.get("/", function(req, res) {
        res.send("Ecommerce Setup");
    });

    const userRoutes = require('./routes/user_routes');
    app.use("/api/user", userRoutes);

    const productRoutes = require('./routes/product_routes');
    app.use("/api/product", productRoutes);

});

const PORT = 5000;
app.listen(PORT, function() {
    console.log(`Server started at PORT: ${PORT}`);
});