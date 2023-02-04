require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
  
    // Database connection 🥳
    mongoose.connect(" mongodb+srv://user:user@cluster0.1decama.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).catch(err => {
        console.log('Connection failed ☹️☹️☹️☹️');
    });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;