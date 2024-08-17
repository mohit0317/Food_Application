const fs = require('fs');
const foodModel = require('../models/foodModel');


//add food 
const addFood = async (req, res) => {

    let image_fielname = req?.file?.filename;
    const body = req.body;

    const food = new foodModel({
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        image: image_fielname
    })

    try {
        await food.save();
        res.status(200).json({ success: true, message: 'food added ' });
    }
    catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//All food List
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ data: foods });
    }
    catch (error) {
        console.log('Error', error);
        res.status(500).json('Internal Server error');
    }
}

//Remove Food item
const removeFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await foodModel.findById(foodId);
        fs.unlink(`uploads/${food?.image}`, () => { });
        await foodModel.findByIdAndDelete(foodId);

        res.status(200).json({ message: 'food removed' })
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
}

module.exports = {
    addFood,
    listFood,
    removeFood
}