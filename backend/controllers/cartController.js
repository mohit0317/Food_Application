const foodModel = require("../models/foodModel");
const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user._id;

        console.log('itemId', itemId);
        console.log('userId', userId);

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Please provide userId and itemId" });
        }

        const item = await foodModel.findById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let cartData = user.cartData || {};
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        }
        else {
            cartData[itemId] += 1;
        }

        await user.save();

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: 'Item added to cart', cartData: user.cartData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const removeCartItem = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user._id;

    try {
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: "Item removed from the card" });

    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// get cart items of a user
const getCartItems = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await userModel.findById({ _id: userId });
        if (!user) return res.status(404).json({ success: false, message: `User with id ${userId} is not present` });
        const cartData = user.cartData;
        res.status(200).json({ success: true, cartData })
    } catch (error) {
        console.log('Error', error);
    }
}


module.exports = {
    addToCart, removeCartItem, getCartItems
}



