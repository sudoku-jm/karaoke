module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      //music 테이블 생성
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name : {
        type: DataTypes.STRING(20), //20글자이하 제한
        allowNull: false, 
      },
      c_delYN: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
      paranoid: true,
    }
  );
  Category.associate = (db) => {
    db.Category.hasMany(db.Music);
    db.Category.hasMany(db.Board);
  };
  return Category;
};
