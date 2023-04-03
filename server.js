const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parese requests of content-type - application/json
app.use(bodyParse.json());

// parse requests of content-type - application/x-wwww-form-urlencoded
app.use(bodyParser.urlencoded({extend: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to the jwt application"});
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});