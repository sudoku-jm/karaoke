module.exports = (sequelize, DataTypes) => {
    const MusicHistory = sequelize.define(
        "MusicHistory",
        {
            ip: {
                type: DataTypes.STRING, // IP 주소 또는 다른 방문자 식별자
                allowNull: true,
            },
            postId: {
                type: DataTypes.INTEGER, // 조회한 게시글의 ID
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY, // 조회 일자
                defaultValue: DataTypes.NOW,
            },
        },
        {
            charset: "utf8", //이모티콘 : utf8mb4
            collate: "utf8_general_ci",
        }
    );
    MusicHistory.associate = (db) => {
        db.MusicHistory.belongsTo(db.Music);
    };
    return MusicHistory;
};
