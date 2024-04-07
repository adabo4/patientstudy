// db.js

const mongoose = require('mongoose');
require("dotenv").config();

// MongoDB connection URL 
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@patientstudy.mmjxo14.mongodb.net/?retryWrites=true&w=majority`

// MongoDB options
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Create a function to establish the MongoDB connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI, mongoOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToDatabase;