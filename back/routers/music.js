const express = require("express");
const { Board, Category } = require("../models");
const { Op } = require("sequelize");
const { removeSpecialCharacters, includesSearch } = require("../func/form");
const router = express.Router();

router.get("/test", (req, res, next) => {
    try {
        res.send("hello express test");
    } catch (error) {
        console.error(error);
        next(error); //status(500) 500번 에러. 서버쪽 에러
    }
});

//카테고리 리스트

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

        const categoryName = removeSpecialCharacters(req.body.categoryName); //사용자 입력 검색어.특수문자 제거
        const categoryList = await Category.findAll({
            where: {},
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });

        //카테고리 단어 검색
        if (categoryName !== "") {
            let categoryDataList = categoryList.find((c) => {
                const str = includesSearch(categoryName, c.name);
                return str.partialMatch || str.includesTxt;
            });

            if (categoryDataList == undefined || categoryDataList == false) {
                categoryDataList = [];
            }

            const result = {
                data: categoryDataList !== undefined ? categoryDataList : [],
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

//music/insertMusic : 노래방 곡 추가|수정 신청.
router.post("/insert", async (req, res, next) => {
    try {
        //카테고리 아이디가 빈값으로 왔을 경우, 카테고리 이름 = 카테고리 DB 검사 후 같은게 있을 경우 CategoryId 매칭. 없으면 빈값.
        let cateId = "";
        if (req.body.categoryId == "") {
            return res.status(202).json({
                msg: "카테고리 아이디가 없습니다.",
            });
        } else {
            //카테고리 아이디가 빈값이 아닐 때
            cateId = req.body.categoryId;
        }

        console.log("cateId===========", cateId);
        const category = await Category.findOne({
            where: {
                id: cateId,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            raw: true,
        });
        console.log("category===========", category);

        // let form = {
        //   category : req.body.category,
        //   CategoryId : cateId,
        //   title : req.body.title,
        //   singer : req.body.singer,
        //   keumyong : req.body.keumyong,
        //   taejin : req.body.taejin,
        //   link : req.body.link,
        //   contents: req.body.contents,
        // }
        // //musicId가 없으면 새로 작성.
        // if(req.body.musicId !== ""){
        //   form.MusicId = req.body.musicId;
        //   form.new = 'N'; //수정 요청
        // }//musicId가 있으면 수정 요청.

        // // 게시글 추가.
        // await Board.create({
        //   ...form
        // });

        res.status(200).json({
            // new: form.new,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
