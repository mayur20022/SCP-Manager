const mongoose = require('mongoose')


function mongoConnect() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB", err);
        })
}

module.exports = mongoConnect;

