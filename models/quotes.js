const mongoose = require("mongoose");

const gpsdataSchema = new mongoose.Schema({
    q : {
        type: String,
        
    },
  
    
});

const q = mongoose.model("q", gpsdataSchema);

module.exports = q;