const mongoose= require('mongoose');

const User = new mongoose.Schema({
    email: String,
    password: String,
    token: Number
});


module.exports = mongoose.model("user",User);

