const mongoose = require("mongoose");
const products = require("./models/products");
mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("database connected succesfully");
})
.catch(err=>{
    console.log(err, "error occured during connection");
});

module.exports = products;
