const express = require('express');
const auth = require('../middlewares/auth');
const { orderPlace } = require('../controllers/ordeController');

const router = express.Router();

router.post('/place', auth, orderPlace);


module.exports = router