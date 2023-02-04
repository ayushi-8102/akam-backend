const mongoose = require("mongoose");

const policeSchema = new mongoose.Schema({
    idnumber : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    }

    
});

const policedata = mongoose.model("policedata", policeSchema);

module.exports = policedata;