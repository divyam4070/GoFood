const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const foodCollection = db.collection("food_items");
    const foodCollectionCategory = db.collection("foodCategory");

    const foodItemsData = await foodCollection.find({}).toArray();
    const foodCategoryData = await foodCollectionCategory.find({}).toArray();

    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    
    

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};


module.exports = mongoDB;
