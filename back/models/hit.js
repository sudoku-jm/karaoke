
module.exports = (sequelize, DataTypes) => {
  const Hit = sequelize.define(
    "Hit",
    {
      count :{
        type : DataTypes.INTEGER,
        allowNull : false,
      }
      
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
      paranoid: true,
    }
  );
  Hit.associate = (db) => {
    db.Hit.hasMany(db.Music);
  };
  return Hit;
};
