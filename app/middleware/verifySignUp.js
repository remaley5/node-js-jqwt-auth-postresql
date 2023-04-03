// Check if username or email are duplicate 
// Check if roles in the request is existed or not

const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {

        // username
        if(user) {
            res.status(400).send({
                messaged: "Failed! Username already in use!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if(user) {
                res.status(400).send({
                    messaged: "Failed! email already in use"
                });
                return;
            }

            next();
        });
    });
}


checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let i= 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exists = " + req.body.roles[i]
                });
                return
            }
        }
    }
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail, 
    checkRolesExisted: checkRolesExisted
}