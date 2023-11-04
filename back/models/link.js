module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define(
    "Link",
    {
      //music 테이블 생성
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      src: {
        type: DataTypes.STRING(200), // URL 경로는 길어질 수 있음.
        allowNull: false,
      },
    },
    {
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
      paranoid: true,
    }
  );
  Link.associate = (db) => {
    db.Link.belongsTo(db.Music);
  };
  return Link;
};
