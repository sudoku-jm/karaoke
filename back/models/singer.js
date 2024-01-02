module.exports = (sequelize, DataTypes) => {
    const Singer = sequelize.define(
        "Singer",
        {
            //singer 테이블 생성
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(50), //20글자이하 제한

                allowNull: false,
            },
            e_name: {
                type: DataTypes.STRING(50), //20글자이하 제한
                allowNull: true,
            },
            j_name: {
                type: DataTypes.STRING(50), //20글자이하 제한
                allowNull: true,
            },
            s_delYN: {
                type: DataTypes.STRING(1), //삭제여부 : Y, N
                allowNull: false,
                defaultValue: "N",
            },
        },
        {
            charset: "utf8", //이모티콘 : utf8mb4
            collate: "utf8_general_ci",
            paranoid: true,
            indexes: [
                // 인덱스 설정
                {
                    // 인덱스 이름은 따로 지정해주지 않아, 인덱스명은 [table]_[fields]
                    fields: ["name", "id"],
                },
            ],
        }
    );
    Singer.associate = (db) => {
        db.Singer.hasMany(db.Music);
        db.Singer.hasMany(db.Board);
    };
    return Singer;
};
