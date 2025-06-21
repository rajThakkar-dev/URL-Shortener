const mongoose = require("mongoose");

async function connectDb(url){
    mongoose.connect(url);
}

module.exports = {
    connectDb
}