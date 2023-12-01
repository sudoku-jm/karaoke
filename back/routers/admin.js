const express = require("express");
const { Board, Category, Singer, sequelize, Music } = require("../models");
const { Op } = require("sequelize");
const { includesSearch, musicFindAllByNumber } = require("../func/form");
const router = express.Router();

// 가수 추가
//admin/insertSinger
router.post("/insertSinger", async (req, res, next) => {
    try {
        console.log(
            "/admin/insertSinger=================================[START]"
        );
        let form = {};

        /******** board에서 바로 가수 추가시 boardId있음****** */
        if (req.body.boardId !== undefined && req.body.boardId !== "") {
            //가수 아이디를 가지고 온 경우(boardId있음)
            const boardData = await Board.findOne({
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
        const singerList = await Singer.findAll({
            where: {},
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        //기존 동일 이름 가수가 있는지 체크
        let dataList = singerList.find((s) => {
            const strName = includesSearch(form.name, s.name);
            const strEName = includesSearch(form.e_name, s.e_name);
            const strJName = includesSearch(form.j_name, s.j_name);
            return (
                strName.partialMatch ||
                strName.includesTxt ||
                strEName.partialMatch ||
                strEName.includesTxt ||
                strJName.partialMatch ||
                strJName.includesTxt
            );
        });

        if (dataList !== undefined) {
            return res.status(202).json({
                data: dataList,
                msg: "가수 데이터가 이미 존재합니다.",
            });
        } else {
            const data = await Singer.create({
                ...form,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });

            res.status(200).json({
                data,
                msg: "SUCCESS",
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

        if (req.body.boardId !== "") {
            const boardData = await Board.findOne({
                where: {
                    id: req.body.boardId,
                },
            });

            cateName = boardData.b_category;
        }

        const categoryList = await Category.findAll({
            where: {},
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        let dataList = categoryList.find((c) => {
            const str = includesSearch(cateName, c.name);
            return str.partialMatch || str.includesTxt;
        });

        if (dataList == undefined || dataList == "") {
            const data = await Category.create({
                name: cateName,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });

            res.status(200).json({
                data,
                msg: "SUCCESS",
            });
        } else {
            return res.status(202).json({
                data: dataList,
                msg: "카테고리 데이터가 이미 존재합니다.",
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

        if (req.body.boardId !== undefined && req.body.boardId !== "") {
            //boardId있음
            const boardData = await Board.findOne({
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

                        const insertedMusicData = await Music.findOne({
                            where: {
                                id: newMusicData.id,
                            },
                            include: [
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

                        res.status(200).json({
                            data: insertedMusicData,
                            msg: "SUCCESS",
                            msg2: "추가완료",
                        });
                    }
                } else if (boardData.new == "N") {
                    //기존에 음악이 있는지 검사.

                    console.log("boardData====", boardData);

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
                        raw: true,
                    });
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
