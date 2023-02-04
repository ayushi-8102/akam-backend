const mongoose = require("mongoose");

const gpsdataSchema = new mongoose.Schema({

    latitude : {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    updatedate: {
        type: Date,
        default: Date.now(),
        required: false
    },
    
});

const gpsdata = mongoose.model("emergency", gpsdataSchema);

module.exports = gpsdata;


