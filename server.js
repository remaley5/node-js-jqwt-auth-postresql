const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
// DB
const db = require("./app/models");
const Role = db.role;


    // user force for development
    // remove initial() and use sync without parameters in production: db.sequelize.syc()
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and resync Db');
    initial();
});

    // Create three rows in database
function initial() {
    Role.create({
        id: 1, 
        name: "user"
    });

    Role.create({
        id: 2, 
        name: "moderator"
    });

    Role.create({
        id: 3, 
        name: "admin"
    });
}

// CORS

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