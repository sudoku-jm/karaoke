const express = require("express");
const {
    Board,
    Category,
    Singer,
    sequelize,
    Music,
    Tag,
    MusicTag,
    Link,
    Sequelize,
} = require("../models");
const { Op } = require("sequelize");
const {
    includesSearch,
    musicFindAllByNumber,
    createUpdateMusicTag,
    createUpdateLink,
    updateBoardMusicId,
} = require("../func/form");
const router = express.Router();

// 가수 추가
//admin/insertSinger
router.post("/insertSinger", async (req, res, next) => {
    try {
        console.log(
            "/admin/insertSinger=================================[START]"
        );

        if (req.body.name == "" && req.body.boardId == "") {
            return res.status(202).json({
                msg: "가수 한글명은 필수입니다.",
            });
        }
        let form = {};
        let boardData;
        let resultData;
        /******** board에서 바로 가수 추가시 boardId있음****** */
        if (req.body.boardId !== undefined && req.body.boardId !== "") {
            //가수 아이디를 가지고 온 경우(boardId있음)
            boardData = await Board.findOne({
                where: {
                    id: req.body.boardId,
                },
            });

            form = {
                name: boardData.b_singer,
                e_name: boardData.b_e_singer,
                j_name: boardData.b_j_singer,
            };
        } else {
            //가수 아이디를 가지고 오지 않은 경우(boardId없음 : name, e_name, j_name 작성해서 추가)
            form = {
                name: req.body.name,
                e_name: req.body.e_name,
                j_name: req.body.j_name,
            };
        }

        //한글 가수명 필수 체크
        if (form.name == "" || form.name == undefined) {
            return res.status(202).json({
                msg: "가수 한글명은 필수입니다.",
            });
        }

        //가수 전체 데이터 가지고 와서 비교
        const dataList = await Singer.findAll({
            where: Sequelize.where(
                Sequelize.fn(
                    "REPLACE",
                    Sequelize.fn(
                        "TRIM",
                        Sequelize.fn("LOWER", Sequelize.col("name"))
                    ),
                    " ",
                    ""
                ),
                Sequelize.fn(
                    "REPLACE",
                    Sequelize.fn("TRIM", Sequelize.fn("LOWER", form.name)),
                    " ",
                    ""
                )
            ),
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        if (!dataList.length > 0) {
            resultData = await Singer.create({
                ...form,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });
        }
        if (boardData !== undefined) {
            await Board.update(
                {
                    SingerId:
                        dataList.length > 0 ? dataList[0].id : resultData.id,
                },
                {
                    where: {
                        b_singer: form.name,
                    },
                    raw: true,
                    returning: true, // 업데이트된 데이터를 반환
                }
            );
        }

        if (!dataList.length > 0) {
            res.status(200).json({
                data: resultData,
                msg: "SUCCESS",
            });
        } else {
            return res.status(202).json({
                data: dataList,
                msg: `${dataList[0].name} 가수 데이터가 이미 존재합니다.`,
            });
        }

        console.log(
            "/admin/insertSinger=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// 카테고리 추가
//admin/insertCategory
router.post("/insertCategory", async (req, res, next) => {
    try {
        console.log(
            "/admin/insertCategory=================================[START]"
        );

        if (req.body.name == "" && req.body.boardId == "") {
            return res.status(202).json({
                msg: "카테고리명은 필수입니다.",
            });
        }

        let cateName = req.body.name;
        let boardData;
        let resultData;

        if (req.body.boardId !== "") {
            boardData = await Board.findOne({
                where: {
                    id: req.body.boardId,
                },
            });

            cateName = boardData.b_category;
        }

        //기존에 데이터가 있는지 찾기 없으면 만들기.
        const dataList = await Category.findAll({
            where: Sequelize.where(
                Sequelize.fn(
                    "REPLACE",
                    Sequelize.fn(
                        "TRIM",
                        Sequelize.fn("LOWER", Sequelize.col("name"))
                    ),
                    " ",
                    ""
                ),
                Sequelize.fn(
                    "REPLACE",
                    Sequelize.fn("TRIM", Sequelize.fn("LOWER", cateName)),
                    " ",
                    ""
                )
            ),
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        if (!dataList.length > 0) {
            resultData = await Category.create({
                name: cateName,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });
        }

        //요청 게시판에서 추가했을 경우
        if (boardData !== undefined) {
            //기존 요청 리스트에서 같은 이름을 가진 리스트가 있으면 카테고리 아이디 연결 업데이트
            await Board.update(
                {
                    CategoryId:
                        dataList.length > 0 ? dataList[0].id : resultData.id,
                },
                {
                    where: {
                        b_category: cateName,
                    },
                    raw: true,
                    returning: true, // 업데이트된 데이터를 반환
                }
            );
        }

        if (!dataList.length > 0) {
            res.status(200).json({
                data: resultData,
                msg: "SUCCESS",
            });
        } else {
            return res.status(202).json({
                data: dataList,
                msg: `${dataList[0].name} 카테고리 데이터가 이미 존재합니다.`,
            });
        }

        console.log(
            "/admin/insertCategory=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// 음악 추가
//admin/insertMusic
router.post("/insertMusic", async (req, res, next) => {
    try {
        console.log(
            "/admin/insertMusic=================================[START]"
        );
        /******** board에서 바로 음악 추가시 boardId있음****** */
        let form = {};
        let boardData;

        if (req.body.boardId !== undefined && req.body.boardId !== "") {
            //boardId있음
            boardData = await Board.findOne({
                where: {
                    id: req.body.boardId,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });

            if (boardData !== null) {
                if (boardData.new == "Y") {
                    //신규 추가 요청일 때

                    if (
                        boardData.b_keumyong == "" &&
                        boardData.b_taejin == ""
                    ) {
                        return res.status(202).json({
                            msg: "음원 번호가 빈값입니다.",
                        });
                    }

                    //금영,태진 번호로 Music데이터 가져오기
                    const beforeData = await musicFindAllByNumber(
                        boardData.b_keumyong,
                        boardData.b_taejin
                    );

                    if (beforeData.length > 0) {
                        //요청 게시판 업데이트
                        updateBoardMusicId(beforeData);

                        return res.status(202).json({
                            data: beforeData,
                            msg: "요청 번호로 음원 데이터가 이미 존재합니다. 수정 시 음원 수정요청 작성을 해주세요.",
                        });
                    } else {
                        form = {
                            title: boardData.b_title,
                            keumyong: boardData.b_keumyong,
                            taejin: boardData.b_taejin,
                            CategoryId: boardData.CategoryId,
                            SingerId: boardData.SingerId,
                            HitId: null,
                        };

                        const newMusicData = await Music.create({
                            ...form,
                            attributes: {
                                exclude: [
                                    "createdAt",
                                    "updatedAt",
                                    "deletedAt",
                                ],
                            },
                            raw: true,
                        });

                        //tag 찾기/넣기==================================
                        createUpdateMusicTag(
                            "CREATE",
                            boardData.b_tags,
                            newMusicData
                        );

                        //link넣기 ===============================
                        createUpdateLink(
                            "CREATE",
                            boardData.b_link,
                            newMusicData
                        );

                        const insertedMusicData = await Music.findOne({
                            where: {
                                id: newMusicData.id,
                            },
                            include: [
                                {
                                    model: Tag,
                                    attributes: ["name"],
                                },
                                {
                                    model: Category,
                                    attributes: ["name"],
                                },
                                {
                                    model: Singer,
                                    attributes: ["name", "e_name", "j_name"],
                                },
                            ],
                            attributes: {
                                exclude: [
                                    "createdAt",
                                    "updatedAt",
                                    "deletedAt",
                                ],
                            },
                        });

                        //요청 게시판 업데이트
                        updateBoardMusicId(beforeData, newMusicData);

                        res.status(200).json({
                            data: insertedMusicData,
                            msg: "SUCCESS",
                            msg2: "추가완료",
                        });
                    }
                } else if (boardData.new == "N") {
                    //기존에 음악이 있는지 검사.

                    //   console.log("boardData====", boardData);

                    if (boardData.MusicId == "" || boardData.MusicId == null) {
                        return res.status(202).json({
                            msg: "파라미터 오류. (수정시 musicId 필수)",
                        });
                    }

                    const musicData = await Music.findOne({
                        where: {
                            id: boardData.MusicId,
                        },
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "deletedAt"],
                        },
                        raw: true,
                    });

                    //수정일 때
                    form = {
                        title:
                            boardData.b_title == ""
                                ? musicData.title
                                : boardData.b_title,
                        keumyong:
                            boardData.b_keumyong == ""
                                ? musicData.keumyong
                                : boardData.b_keumyong,
                        taejin:
                            boardData.b_taejin == ""
                                ? musicData.taejin
                                : boardData.b_taejin,
                        CategoryId:
                            boardData.CategoryId == ""
                                ? musicData.CategoryId
                                : boardData.CategoryId,
                        SingerId:
                            boardData.SingerId == ""
                                ? musicData.SingerId
                                : boardData.SingerId,
                        HitId: null,
                    };

                    await Music.update(form, {
                        where: {
                            id: musicData.id,
                        },
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "deletedAt"],
                        },
                        // raw: true,
                        returning: true, // 업데이트된 데이터를 반환
                    });

                    //tag 찾기==================================
                    createUpdateMusicTag("UPDATE", boardData.b_tags);

                    res.status(200).json({
                        data: form,
                        msg: "SUCCESS",
                        msg2: "수정완료",
                    });
                }
            } else {
                return res.status(202).json({
                    msg: "게시글이 존재하지 않습니다.",
                });
            }
        } else {
            //직접 작성해서 반영
            return res.status(202).json({
                msg: "게시판아이디가 필요합니다. 직접 작성 반영 개발중",
            });
        }

        console.log("/admin/insertMusic=================================[END]");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
