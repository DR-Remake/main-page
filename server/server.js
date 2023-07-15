const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { routesInit } = require("./routes/configRoute.js");

app.use(cors());
app.use(express.json());
routesInit(app);

app.listen(process.env.PORT, () => {
    console.log('Server - running.')
})

mongoose.connect(process.env.DB).then(() => {
    console.log('DB - connected.')
}).catch((err) => {
    console.log(err)
})