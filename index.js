require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const corsOptions = require("./config/corsConf");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const connectDB = require('./config/dbConf');
const PORT = process.env.PORT || 200;

connectDB();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


app.use("/registerUser", require("./routes/registerUser"));

mongoose.connection.once('open', () => {
   console.log('Connected to mongodb');
   app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});