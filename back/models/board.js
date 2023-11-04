module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      //music 테이블 생성
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      category:{
        type: DataTypes.STRING(20), //20글자이하 제한
        allowNull: false, 
      },
      title : {
        type: DataTypes.STRING(50), //50글자이하 제한
        allowNull: true, 
      },
      singer : {
        type: DataTypes.STRING(20), //50글자이하 제한
        allowNull: true, 
      },
      keumyong : {
        type: DataTypes.STRING(8), 
        allowNull: true, 
      },
      taejin : {
        type: DataTypes.STRING(8), 
        allowNull: true, 
      },
      link: {
        type: DataTypes.STRING(200), // URL 경로는 길어질 수 있음.
        allowNull: false,
      },
      contents : {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      new : { 
        type: DataTypes.STRING(1), //요청 수정 여부 : Y (새로 요청), N(수정 요청)
        allowNull: false,
        defaultValue: "Y",
      },
      b_delYN: {
        type: DataTypes.STRING(1), //삭제여부 : Y, N
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      modelName : 'Board',
      tableName : 'boards',
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
      paranoid: true,
    }
  );
  Board.associate = (db) => {
    db.Board.belongsTo(db.Music);
    db.Board.belongsTo(db.Category);

  };
  return Board;
};
