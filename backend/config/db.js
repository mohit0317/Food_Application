const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://khdmohit00:pppppppp@cluster0.ctwzf1g.mongodb.net/food-del');
        console.log('mongoose connected');
    } catch (error) {
        console.log('Error while connecting to DB:', error.message);
    }
}

module.exports = connectDB;
