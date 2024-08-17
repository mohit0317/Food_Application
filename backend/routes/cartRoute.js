const express = require("express");
const { addToCart, removeCartItem, getCartItems } = require("../controllers/cartController");
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/add', auth, addToCart);
router.post('/remove', auth, removeCartItem);
router.get('/getCartData', auth, getCartItems);




module.exports = router;