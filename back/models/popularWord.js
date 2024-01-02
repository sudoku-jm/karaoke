module.exports = (sequelize, DataTypes) => {
    const PopularWord = sequelize.define(
        "PopularWord",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            word: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            count: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
        },
        {
            charset: "utf8", //이모티콘 : utf8mb4
            collate: "utf8_general_ci",
            indexes: [
                // 인덱스 설정
                {
                    // 인덱스 이름은 따로 지정해주지 않아, 인덱스명은 [table]_[fields]
                    fields: ["count", "id"],
                },
            ],
        }
    );
    PopularWord.associate = (db) => {
        db.PopularWord.belongsToMany(db.Tag, { through: "PopularWordTag" });
    };
    return PopularWord;
};
