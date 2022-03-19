const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://duytam03062001:duytam03062001@cluster0.3gcac.mongodb.net/Final_Web?retryWrites=true&w=majority", {
                useNewUrlParser: true,
            }
        );
        console.log("successfully Final_Web");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };