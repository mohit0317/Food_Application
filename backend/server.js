const express = require('express');
const cors = require('cors');
require("dotenv").config();

const connectDB = require('./config/db');

const foodRouter = require('./routes/foodRoute');
const userRouter = require('./routes/UserRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');


//app config
const app = express();
const PORT = 4000;

//middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

app.use('/images', express.static('uploads'));

//api endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);


app.get('/', (req, res) => {
    res.send('API Working')
});

app.listen(PORT, () => {
    console.log(`Server server started at ${PORT}`);
})