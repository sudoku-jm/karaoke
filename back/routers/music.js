const express = require("express");
const {
    Board,
    Category,
    Singer,
    sequelize,
    Music,
    Sequelize,
    Tag,
    Hit,
    Link,
    MusicTag,
} = require("../models");
const { Op } = require("sequelize");
const {
    removeSpecialCharacters,
    includesSearch,
    musicTagFindBySearchStr,
    arrayFilterSameData,
} = require("../func/form");
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
            let dataList = [];
            //연관 단어가 포함되면 list에 넣어서 반환
            categoryList.find((c) => {
                const str = includesSearch(categoryName, c.name);
                if (str.partialMatch || str.includesTxt) {
                    dataList.push(c);
                }
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
            let dataList = [];
            singerList.find((s) => {
                const strName = includesSearch(singerName, s.name);
                const strEName = includesSearch(singerName, s.e_name);
                const strJName = includesSearch(singerName, s.j_name);
                if (
                    strName.partialMatch ||
                    strName.includesTxt ||
                    strEName.partialMatch ||
                    strEName.includesTxt ||
                    strJName.partialMatch ||
                    strJName.includesTxt
                ) {
                    dataList.push(s);
                }
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

//music/insertBoard : 노래방 곡 추가|수정 신청.
router.post("/insertBoard", async (req, res, next) => {
    try {
        console.log("/music/insert=================================[START]");

        //필수 값 체크
        if (req.body.singerId == "" && req.body.singerName == "") {
            return res.status(202).json({
                msg: "가수 이름은 필수 입니다.",
            });
        }

        if (req.body.categoryId == "" && req.body.categoryName == "") {
            return res.status(202).json({
                msg: "카테고리명은 필수 입니다.",
            });
        }

        //카테고리 아이디
        let cateId = "";
        let category = {};
        if (req.body.categoryId !== "") {
            //카테고리 아이디가 빈값이 아닐 때
            cateId = req.body.categoryId;
            //카테고리 기존 게시물에 존재할 때.
            category = await Category.findOne({
                where: {
                    id: cateId,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });
        }
        //가수 아이디
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
        }

        let form = {};
        let musicData = {};
        const orConditions = [];

        if (req.body.musicId !== "") {
            orConditions.push({
                id: req.body.musicId,
            });
        }

        if (req.body.keumyong !== "") {
            orConditions.push({
                keumyong: req.body.keumyong,
            });
        }
        if (req.body.taejin !== "") {
            orConditions.push({
                taejin: req.body.taejin,
            });
        }

        if (orConditions.length > 0) {
            musicData = await Music.findOne({
                where: {
                    [Op.or]: orConditions,
                },
                attributes: {
                    exclude: ["createdAt", "deletedAt"],
                },
                raw: true,
            });
        }

        /** 새글 작성 */
        if (req.body.new == "Y") {
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
                new: "Y",
                CategoryId: Object.keys(category).length !== 0 ? cateId : null,
                MusicId: null,
                SingerId: Object.keys(singer).length !== 0 ? singerId : null,
            };

            if (req.body.title == "") {
                //제목 필수
                return res.status(202).json({
                    msg: "파라미터 오류. 제목 필수",
                });
            }
            if (req.body.keumyong == "" && req.body.taejin == "") {
                //둘다 빈값 안됨
                return res.status(202).json({
                    msg: "파라미터 오류. 노래방 번호 필수",
                });
            }

            if (Object.keys(category).length !== 0 && category !== null) {
                //카테고리 값이 있을 때
                form.b_category = category.name;
            }

            if (Object.keys(singer).length !== 0 && singer !== null) {
                //가수 값이 있을 때
                form.b_singer = singer.name;
                form.b_e_singer = singer.e_name;
                form.b_j_singer = singer.j_name;
            } else if (
                Object.keys(singer).length == 0 &&
                singer == null &&
                req.body.singerName == ""
            ) {
                //가수 값도 없고, 가수이름 작성도 안했을 때 안됨
                return res.status(202).json({
                    msg: "파라미터 오류. 가수 정보가 없습니다.",
                });
            }
        }

        /** 수정 작성 */
        if (req.body.new == "N") {
            if (req.body.musicId == "") {
                return res.status(202).json({
                    msg: "파라미터 오류. (수정시 musicId 필수)",
                });
            }

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
                CategoryId: Object.keys(category).length !== 0 ? cateId : null,
                MusicId: req.body.musicId,
                SingerId: Object.keys(singer).length !== 0 ? singerId : null,
            };

            //카테고리
            if (Object.keys(category).length !== 0 && category !== null) {
                //카테고리 값이 있을 때
                form.b_category = category.name;
            }
            // if (cateId !== "" && req.body.categoryName !== "") {
            //     form.b_category = req.body.categoryName;
            // } else if (
            //     Object.keys(category).length !== 0 &&
            //     category !== null
            // ) {
            //     //카테고리 값이 있을 때
            //     form.b_category = category.name;
            // }

            //가수
            if (singerId !== "" && req.body.singerName !== "") {
                form.b_singer = req.body.singerName;
                form.b_e_singer = req.body.singerEName;
                form.b_j_singer = req.body.singerJNam;
            } else if (Object.keys(singer).length !== 0 && singer !== null) {
                //가수 값이 있을 때
                form.b_singer = singer.name;
                form.b_e_singer = singer.e_name;
                form.b_j_singer = singer.j_name;
            }
        }

        // 게시글 추가.
        console.log("form333================", form);
        await Board.create({ ...form, raw: true });

        res.status(200).json({
            data: {
                beforeData: musicData !== null ? musicData : "",
                newData: form,
            },
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
            limit: 5,
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

//음악 검색 리스트
//music/searchMusicList
router.get("/searchMusicList", async (req, res, next) => {
    try {
        console.log(
            "/music/searchMusicList=================================[START]"
        );

        const searchStr = req.query.searchStr;
        // if (searchStr == "") {
        //     return res.status(202).json({
        //         msg: "검색어는 필수입니다.",
        //     });
        // }
        const MusicData = await Music.findAll({
            // where: Sequelize.or(
            //     {
            //         [Op.or]: [
            //             {
            //                 title: {
            //                     [Op.like]: `%${searchStr}%`,
            //                 },
            //             },
            //             {
            //                 keumyong: {
            //                     [Op.like]: `%${searchStr}%`,
            //                 },
            //             },
            //             {
            //                 taejin: {
            //                     [Op.like]: `%${searchStr}%`,
            //                 },
            //             },
            //             {
            //                 "$Singer.name$": {
            //                     [Op.like]: `%${searchStr}%`,
            //                 },
            //             },
            //             {
            //                 "$Singer.e_name$": {
            //                     [Op.like]: `%${searchStr}%`,
            //                 },
            //             },
            //             {
            //                 "$Singer.j_name$": {
            //                     [Op.like]: `%${searchStr}%`,
            //                 },
            //             },
            //             {
            //                 "$Category.name$": {
            //                     [Op.like]: `%${searchStr}%`,
            //                 },
            //             },
            //         ],
            //     },
            //     {
            //         id: {
            //             [Op.lt]: parseInt(req.query.lastId, 10),
            //         },
            //     }
            // ),
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${searchStr}%`,
                        },
                    },
                    {
                        keumyong: {
                            [Op.like]: `%${searchStr}%`,
                        },
                    },
                    {
                        taejin: {
                            [Op.like]: `%${searchStr}%`,
                        },
                    },
                    {
                        "$Singer.name$": {
                            [Op.like]: `%${searchStr}%`,
                        },
                    },
                    {
                        "$Singer.e_name$": {
                            [Op.like]: `%${searchStr}%`,
                        },
                    },
                    {
                        "$Singer.j_name$": {
                            [Op.like]: `%${searchStr}%`,
                        },
                    },
                    {
                        "$Category.name$": {
                            [Op.like]: `%${searchStr}%`,
                        },
                    },
                ],
            },
            // limit: 10,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Tag,
                    attributes: {
                        include: ["name"],
                        exclude: ["createdAt", "updatedAt", "deletedAt"],
                    },
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.like]: `%${decodeURIComponent(
                                        searchStr
                                    )}%`,
                                },
                            },
                        ],
                    },
                    // where: { name: {decodeURIComponent(searchStr)} },
                    through: {
                        // 그 외 중첩 연결테이블 제외.
                        attributes: [],
                    },
                },
                {
                    model: Singer,
                    attributes: {
                        include: ["name", "e_name", "j_name"],
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "deletedAt",
                            "s_delYN",
                        ],
                    },
                    required: false, // 연결된 값이 없어도 가져오기
                },
                {
                    model: Category,
                    attributes: {
                        include: ["name"],
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "deletedAt",
                            "c_delYN",
                        ],
                    },
                    required: false, // 연결된 값이 없어도 가져오기
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            //   raw: true,
        });

        let where = {};
        if (parseInt(req.query.lastId, 10)) {
            // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }

        const tagMusicDataList = await musicTagFindBySearchStr(
            where,
            searchStr
        );

        let combinedArray = JSON.stringify(
            arrayFilterSameData(MusicData, tagMusicDataList, "id"),
            null,
            2
        );

        combinedArray = JSON.parse(combinedArray);

        let result;
        if (combinedArray.length > 0) {
            try {
                // Promise.all 사용
                result = await Promise.all(
                    combinedArray.map(async (item) => {
                        try {
                            const foundLink = await Link.findAll({
                                where: {
                                    MusicId: item.id,
                                },
                                attributes: {
                                    exclude: [
                                        "createdAt",
                                        "updatedAt",
                                        "deletedAt",
                                        "MusicId",
                                    ],
                                },
                                raw: true,
                            });

                            // link 데이터를 찾았을 때만 추가
                            if (foundLink.length > 0) {
                                item.linkList = foundLink;
                            }

                            const tagList = await Music.findAll({
                                where: {
                                    id: item.id,
                                },
                                include: [
                                    {
                                        model: Tag,
                                        through: MusicTag, // through 속성을 통해 MusicTag 테이블을 지정
                                        attributes: ["id", "name"], // 가져올 태그의 속성을 지정
                                    },
                                ],
                                raw: true,
                            });

                            const tagNamesArray = tagList.map((music) =>
                                music["Tags.name"] !== null
                                    ? music["Tags.name"]
                                    : ""
                            );

                            if (tagNamesArray.length > 0) {
                                item.Tags = tagNamesArray;
                            }

                            return item; // Promise.all에서 반환할 값으로 각 item을 반환
                        } catch (error) {
                            console.error("Error finding link:", error);
                            throw error; // 에러 발생시에는 Promise.all이 중단되도록 에러를 다시 throw
                        }
                    })
                );
            } catch (error) {
                console.error("Error in Promise.all:", error);
            }
        }

        res.status(200).json({
            data: result !== undefined ? result : [],
            msg: "SUCCESS",
        });
        console.log(
            "/music/searchMusicList=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//음악 검색 리스트
//music/searchMusicList
router.get("/searchMusicList3", async (req, res, next) => {
    try {
        console.log(
            "/music/searchMusicList3=================================[START]"
        );

        const searchStr = req.query.searchStr;

        console.log("searchStr===", searchStr);

        let where = {};
        if (parseInt(req.query.lastId, 10) > 0) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }

        const MusicData = await Music.findAll({
            where,
            attributes: {
                exclude: ["createdAt", "deletedAt", "m_delYN"],
            },
            include: [
                {
                    model: Tag,
                    through: "MusicTag",
                    as: "Tags",
                    attributes: ["name"],
                    through: {
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "MusicId",
                                "TagId",
                            ],
                        },
                    },
                },
                {
                    model: Singer,
                    attributes: {
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "deletedAt",
                            "s_delYN",
                        ],
                    },
                },
                {
                    model: Category,
                    attributes: {
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "deletedAt",
                            "c_delYN",
                        ],
                    },
                },
                {
                    model: Link,
                    attributes: {
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "deletedAt",
                            "MusicId",
                        ],
                    },
                },
            ],
            // limit: 5,
            order: [["createdAt", "DESC"]],
        }).then((musicRecords) => {
            // musicRecords에는 Music 테이블의 레코드가 포함되어 있음
            const dataList = [];

            musicRecords.forEach((musicRecord) => {
                //Music 정보 접근===========================================
                const title = includesSearch(searchStr, musicRecord.title);
                const keumyong = includesSearch(
                    searchStr,
                    musicRecord.keumyong
                );
                const taejin = includesSearch(searchStr, musicRecord.taejin);

                if (
                    title.partialMatch ||
                    title.includesTxt ||
                    keumyong.partialMatch ||
                    keumyong.includesTxt ||
                    taejin.partialMatch ||
                    taejin.includesTxt
                ) {
                    if (dataList.length > 5) return false;
                    dataList.push(musicRecord);
                }

                // 연결된 Category 정보에 접근=============================

                if (musicRecord.Category) {
                    const categoryName = includesSearch(
                        searchStr,
                        musicRecord.Category.name
                    );
                    if (categoryName.partialMatch || categoryName.includesTxt) {
                        if (dataList.length > 5) return false;
                        dataList.push(musicRecord);
                    }
                } else {
                    console.log("해당 곡은 연결된 카테고리가 없음");
                }

                // 연결된 Tag 정보에 접근==================================
                if (musicRecord.Tags && musicRecord.Tags.length > 0) {
                    musicRecord.Tags.map((tag) => {
                        const tagResult = includesSearch(searchStr, tag.name);
                        if (tagResult.partialMatch || tagResult.includesTxt) {
                            if (dataList.length > 5) return false;
                            dataList.push(musicRecord);
                        }
                    });
                } else {
                    console.log("해당 곡은 연결된 태그가 없음");
                }

                // 연결된 Singer 정보에 접근================================
                if (musicRecord.Singer) {
                    const singerName = includesSearch(
                        searchStr,
                        musicRecord.Singer.name
                    );
                    const singerEName = includesSearch(
                        searchStr,
                        musicRecord.Singer.e_name
                    );
                    const singerJName = includesSearch(
                        searchStr,
                        musicRecord.Singer.j_name
                    );
                    if (
                        singerName.partialMatch ||
                        singerName.includesTxt ||
                        singerEName.partialMatch ||
                        singerEName.includesTxt ||
                        singerJName.partialMatch ||
                        singerJName.includesTxt
                    ) {
                        if (dataList.length > 5) return false;
                        dataList.push(musicRecord);
                    }
                } else {
                    console.log("해당 곡은 연결된 가수정보가 없음");
                }
            });

            // 중복 데이터 삭제=================================================
            const uniqueIdsSet = new Set();
            let musicUniqDataList = [];

            dataList.forEach((item) => {
                if (!uniqueIdsSet.has(item.id)) {
                    uniqueIdsSet.add(item.id);
                    musicUniqDataList.push(item);
                }
            });

            return musicUniqDataList;
        });

        res.status(200).json({
            data: MusicData.length > 0 ? MusicData : [],
            msg: "SUCCESS",
        });
        console.log(
            "/music/searchMusicList=================================[END]"
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//해시태그로 음악 찾기 리스트
//music/searchHashTag
router.get("/searchHashTag", async (req, res, next) => {
    try {
        console.log(
            "/music/searchHashTag=================================[START]"
        );
        const searchStr = req.query.searchStr;
        let where = {};
        if (parseInt(req.query.lastId, 10)) {
            // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }

        const MusicDataList = await musicTagFindBySearchStr(where, searchStr);

        console.log("MusicDataList", MusicDataList);

        res.status(200).json({
            data: MusicDataList,
            msg: "SUCCESS",
        });
        console.log(
            "/music/searchHashTag=================================[END]"
        );
    } catch (error) {
        next(error);
    }
});

//조회수 Hit올리기
router.post("/hitMusic", async (req, res, next) => {
    try {
        //음악 아이디를 받아 기존 음악 리스트 데이터 여부 검사
        if (req.body.musicId == "") {
            return res.status(202).json({
                msg: "파라미터 오류. (musicId 필수)",
            });
        }

        let hitId = "";
        let HitData = {};
        if (req.body.hitId !== "") {
            //수정, 업데이트
            hitId = req.body.hitId;
            await Hit.update(
                {
                    count: sequelize.literal("count + 1"), // 증가시킬 값
                },
                {
                    where: {
                        id: hitId,
                    },
                }
            );
            HitData.id = hitId;
        } else {
            //추가
            const musicData = await Music.findOne({
                where: {
                    id: req.body.musicId,
                },
                attributes: {
                    exclude: ["createdAt", "deletedAt"],
                },
                raw: true,
            });

            hitId = musicData.HitId;

            HitData = await Hit.create({
                count: 1,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                raw: true,
            });
            await Music.update(
                {
                    HitId: HitData.id,
                },
                {
                    where: {
                        id: req.body.musicId,
                    },
                }
            );
        }

        res.status(200).json({
            msg: "SUCCESS",
        });

        //hit DB 추가
    } catch (error) {}
});

//음악 정보
router.get("/musicInfo", async (req, res, next) => {
    try {
        console.log("/music/musicInfo=================================[START]");
        if (req.query.id == undefined && req.query.id == "") {
            return res.status(202).json({
                msg: "음악 정보가 없습니다.",
            });
        }

        //음악 정보 1개
        const resultData = await Music.findOne({
            where: {
                id: req.query.id,
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
                {
                    model: Hit,
                    attributes: ["count"],
                },
                {
                    model: Link,
                    attributes: ["src"],
                },
            ],
            attributes: {
                exclude: ["createdAt", "deletedAt"],
            },
        });

        res.status(200).json({
            data: { resultData },
            msg: "SUCCESS",
        });

        console.log("/music/musicInfo=================================[END]");

        //hit DB 추가
    } catch (error) {}
});

//음악 연관 정보
router.get("/musicChanInfo", async (req, res, next) => {
    try {
        console.log(
            "/music/musicChanInfo=================================[START]"
        );
        if (req.query.id == undefined && req.query.id == "") {
            return res.status(202).json({
                msg: "음악 정보가 없습니다.",
            });
        }

        //음악 정보 1개
        const resultData = await Music.findOne({
            where: {
                id: req.query.id,
            },
            include: [
                {
                    model: Tag,
                    attributes: ["name"],
                },
            ],
            attributes: {
                exclude: ["createdAt", "deletedAt"],
            },
        });

        let where = {};
        if (parseInt(req.query.lastId, 10)) {
            // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }

        let musicArray = [];
        let musicTagArray = [];
        let musicCateArray;
        let musicSingerArray;

        //관련 음악 리스트 : 카테고리
        if (resultData.CategoryId) {
            musicCateArray = await Music.findAll({
                where: {
                    CategoryId: resultData.CategoryId,
                },
                limit: 5,
                attributes: {
                    exclude: ["createdAt", "deletedAt"],
                },
            });
        }

        musicArray = musicArray.concat(...musicCateArray);

        //관련 음악 리스트 : 가수명
        if (resultData.SingerId) {
            musicSingerArray = await Music.findAll({
                where: {
                    SingerId: resultData.SingerId,
                },
                limit: 5,
                attributes: {
                    exclude: ["createdAt", "deletedAt"],
                },
            });
        }

        //관련 태그 | 제목 연관 음악 정보
        if (resultData.Tags.length > 0) {
            musicTagArray = await Promise.all(
                resultData.Tags.map(async (tag) => {
                    const result = await musicTagFindBySearchStr(
                        where,
                        tag.name,
                        5
                    );
                    return result;
                })
            );
        }

        musicArray = musicArray.concat(...musicTagArray);

        const uniqueIdsSet = new Set();
        let musicUniqDataList = [];
        let musicSingerList = [];

        musicArray.forEach((item) => {
            if (!uniqueIdsSet.has(item.id)) {
                if (req.query.id != item.id) {
                    uniqueIdsSet.add(item.id);
                    musicUniqDataList.push(item);
                }
            }
        });

        musicSingerArray.forEach((item) => {
            if (req.query.id != item.id) {
                musicSingerList.push(item);
            }
        });

        res.status(200).json({
            data: { musicUniqDataList, musicSingerList },
            msg: "SUCCESS",
        });

        console.log(
            "/music/musicChanInfo=================================[END]"
        );
        //hit DB 추가
    } catch (error) {}
});

module.exports = router;
