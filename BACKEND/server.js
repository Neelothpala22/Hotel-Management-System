const express = require("express");
const mongoose = require("mongoose");
const bodyParser =  require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection success!");
})

const customerRouter = require("./routes/customers");
const roomRouter = require("./routes/rooms");

app.use("/customer",customerRouter);
app.use("/room", roomRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})


