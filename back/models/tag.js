
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      name : {
        type : DataTypes.STRING(20),
        allowNull : false,
      }
      
    },
    {
      modelName : 'Tag',
      tableName: 'tags',
      charset: "utf8", //이모티콘 : utf8mb4
      collate: "utf8_general_ci",
    }
  );
  Tag.associate = (db) => {
    db.Tag.belongsToMany(db.Music, { through: 'MusicTag' });
    
  };
  return Tag;
};
