module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define(
    "Music",
    {
      //music 테이블 생성
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // category{},
      title: {
        type: DataTypes.STRING(50), //50글자이하 제한
        allowNull: true,
      },
      // singer : {
      //   type: DataTypes.STRING(20), //50글자이하 제한
      //   allowNull: true,
      // },
      keumyong: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      taejin: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      // link : {
      //   type: DataTypes.STRING(200), //이미지 URL 경로는 길어질 수 있음.
      //   allowNull: true,
      // },
      // tag : {
      //   type: DataTypes.STRING(100),
      //   allowNull: true,
      // },
      m_delYN: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      modelName: "Music",
      tableName: "musics",
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
      paranoid: true,
    }
  );
  Music.associate = (db) => {
    db.Music.belongsTo(db.Category);
    db.Music.belongsTo(db.Singer);
    db.Music.belongsTo(db.Hit);
    db.Music.belongsToMany(db.Tag, { through: "MusicTag" });
    db.Music.hasMany(db.Link);
    db.Music.hasMany(db.Board);
    // db.Music.hasMany(db.MusicHistory);
  };
  return Music;
};
