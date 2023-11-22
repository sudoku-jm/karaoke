const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.Category = require("./category")(sequelize, Sequelize);
db.Board = require("./board")(sequelize, Sequelize);
db.Music = require("./music")(sequelize, Sequelize);
db.Hit = require("./hit")(sequelize, Sequelize);
db.Link = require("./link")(sequelize, Sequelize);
db.Tag = require("./tag")(sequelize, Sequelize);
db.Singer = require("./singer")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
