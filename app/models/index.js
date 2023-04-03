const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB, 
    config.USER, 
    config.PASSWORD, 
    {
        host: config.HOST, 
        dialect: config.dialect, 
        operatorsAliases: false, 
        
        pool: {
            max: config.pool.max, 
            min: config.pool.min, 
            aquire: config.pool.aquire, 
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles", 
    foreignKey: "roleId", 
    otherKey: "userId"
});

db.ROLES = ["user", "admin", "moderators"];

module.exports = db;