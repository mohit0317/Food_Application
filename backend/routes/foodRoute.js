const express = require('express');
const { addFood, listFood, removeFood } = require('../controllers/foodController');
const multer = require('multer');
const upload = require('../services/FileUpload');

const router = express.Router();



router.post("/add", upload.single('image'), addFood);
router.get("/list", listFood);
router.delete("/remove-item/:id", removeFood);

module.exports = router;