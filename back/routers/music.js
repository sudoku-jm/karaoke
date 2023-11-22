const express = require("express");
const { Board, Category, Singer, sequelize } = require("../models");
const { Op } = require("sequelize");
const { removeSpecialCharacters, includesSearch } = require("../func/form");
const router = express.Router();

// router.get("/test", (req, res, next) => {
//     try {
//         res.send("hello express test");
//     } catch (error) {
//         console.error(error);
//         next(error); //status(500) 500번 에러. 서버쪽 에러
//     }
// });

//카테고리 전체 리스트

//music/getCategoryList
router.get("/getCategoryList", async (req, res, next) => {
    try {
        //카테고리 데이터 전달
        console.log(
            "/music/getCategoryList=================================[START]"
        );

        const categoryList = await Category.findAll({
            where: {},
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        res.status(200).json(categoryList);
        console.log(
            "/music/getCategoryList=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//카테고리 검색 결과
//music/searchCategory
router.post("/searchCategory", async (req, res, next) => {
    try {
        //카테고리 데이터 전달
        console.log(
            "/music/searchCategory=================================[START]"
        );

        const categoryName = removeSpecialCharacters(
            req.body.categoryName !== "" ? req.body.categoryName : ""
        ); //사용자 입력 검색어.특수문자 제거
        const categoryList = await Category.findAll({
            where: {},
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        //카테고리 단어 검색
        if (categoryName !== "") {
            let dataList = categoryList.find((c) => {
                const str = includesSearch(categoryName, c.name);
                return str.partialMatch || str.includesTxt;
            });

            if (dataList == undefined || dataList == false) {
                dataList = [];
            }

            const result = {
                data: dataList !== undefined ? dataList : [],
                msg: "SUCCESS",
            };
            res.status(200).json(result);
        } else {
            res.status(200).json({
                data: [],
                msg: "검색 결과가 없습니다.",
            });
        }
        console.log(
            "/music/searchCategory=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//가수 전체 리스트
//music/getSingerList
router.get("/getSingerList", async (req, res, next) => {
    try {
        //카테고리 데이터 전달
        console.log(
            "/music/getSingerList=================================[START]"
        );

        const singerList = await Singer.findAll({
            where: {},
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        res.status(200).json(singerList);
        console.log(
            "/music/getSingerList=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//가수 검색 결과
//music/searchSinger
router.post("/searchSinger", async (req, res, next) => {
    try {
        //카테고리 데이터 전달
        console.log(
            "/music/searchSinger=================================[START]"
        );

        const singerName = removeSpecialCharacters(
            req.body.singerName !== "" ? req.body.singerName : ""
        ); //사용자 입력 검색어.특수문자 제거

        const singerList = await Singer.findAll({
            where: {},
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        if (singerList !== "") {
            let dataList = singerList.find((s) => {
                const strName = includesSearch(singerName, s.name);
                const strEName = includesSearch(singerName, s.e_name);
                const strJName = includesSearch(singerName, s.j_name);
                return (
                    strName.partialMatch ||
                    strName.includesTxt ||
                    strEName.partialMatch ||
                    strEName.includesTxt ||
                    strJName.partialMatch ||
                    strJName.includesTxt
                );
            });

            if (dataList == undefined || dataList == false) {
                dataList = [];
            }

            const result = {
                data: dataList !== undefined ? dataList : [],
                msg: "SUCCESS",
            };
            res.status(200).json(result);
        } else {
            res.status(200).json({
                data: [],
                msg: "검색 결과가 없습니다.",
            });
        }

        console.log(
            "/music/searchSinger=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//music/insertMusic : 노래방 곡 추가|수정 신청.
router.post("/insertBoard", async (req, res, next) => {
    try {
        console.log("/music/insert=================================[START]");
        //카테고리 아이디가 빈값으로 왔을 경우, 카테고리 이름 = 카테고리 DB 검사 후 같은게 있을 경우 CategoryId 매칭. 없으면 빈값.
        let cateId = "";
        let category = {};
        if (req.body.categoryId !== "") {
            //카테고리 아이디가 빈값이 아닐 때
            cateId = req.body.categoryId;
            //카테고리 기존 게시물에 존재할 때
            category = await Category.findOne({
                where: {
                    id: cateId,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });
        } else {
            // return res.status(202).json({
            //     msg: "카테고리 아이디가 없습니다.",
            // });
        }

        let singerId = "";
        let singer = {};
        if (req.body.singerId !== "") {
            //가수 아이디가 빈값이 아닐 때
            singerId = req.body.singerId;
            //기존 가수가 존재할 때
            singer = await Singer.findOne({
                where: {
                    id: singerId,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });
        } else {
            // return res.status(202).json({
            //     msg: "가수 데이터 아이디가 없습니다.",
            // });
        }

        let form = {};

        console.log("category", category);
        console.log("singer", singer);

        // 카테고리와 기수가 기존에 있을 때
        if (category !== null && Object.keys(singer).length !== 0) {
            form = {
                b_category: category.name,
                b_title: req.body.title,
                b_singer: singer.name,
                b_e_singer: singer.e_name,
                b_j_singer: singer.j_name,
                b_keumyong: req.body.keumyong,
                b_taejin: req.body.taejin,
                b_link: req.body.link,
                b_contents: req.body.contents,
                b_tags: req.body.tags,
                new: req.body.new,
                CategoryId: cateId,
                MusicId: req.body.musicId !== "" ? req.body.musicId : null,
                SingerId: singerId,
            };
        } else {
            //새로 만들 때
            // return res.status(202).json({
            //     msg: "카테고리 아이디가 없습니다. 관리자에게 카테고리 생성을 요청하세요.",
            // });

            form = {
                b_category: req.body.categoryName,
                b_title: req.body.title,
                b_singer: req.body.singerName,
                b_e_singer: req.body.singerEName,
                b_j_singer: req.body.singerJName,
                b_keumyong: req.body.keumyong,
                b_taejin: req.body.taejin,
                b_link: req.body.link,
                b_contents: req.body.contents,
                b_tags: req.body.tags,
                new: req.body.new,
                CategoryId: category !== null ? cateId : null,
                MusicId: req.body.musicId !== "" ? req.body.musicId : null, //수정시 존재
                SingerId: Object.keys(singer).length !== 0 ? singerId : null,
            };
        }

        // 게시글 추가.
        console.log("form================", form);
        await Board.create({ ...form, raw: true });

        res.status(200).json({
            msg: "SUCCESS",
        });

        console.log("/music/insert=================================[END]");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//전체 요청 리스트
//music/getBoardList
router.get("/getBoardList", async (req, res, next) => {
    try {
        //카테고리 데이터 전달
        console.log(
            "/music/getBoardList=================================[START]"
        );

        let where = {};
        if (req.query.new == "Y") {
            //신곡 요청
            where.new = req.query.new;
        } else if (req.query.new == "N") {
            //수정 요청
            where.new = req.query.new;
        } else {
            //신곡, 수정 상관없이 내려감
            where = {};
        }

        if (parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }

        const boardList = await Board.findAll({
            where,
            limit: 10,
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            order: [["createdAt", "DESC"]],
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
            // raw: true,
        });

        console.log("boardList", boardList);

        res.status(200).json({
            data: boardList,
            msg: "SUCCESS",
        });
        console.log(
            "/music/getBoardList=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
