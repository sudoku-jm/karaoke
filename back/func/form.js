const wanakana = require("wanakana");
const {
    Music,
    Tag,
    Singer,
    Category,
    MusicTag,
    Link,
    Board,
} = require("../models");
const { Op } = require("sequelize");

const removeSpecialCharacters = (inputString) => {
    // 특수문자를 제거하는 정규 표현식
    const regex = /[^a-zA-Z0-9가-힣ぁ-んーァ-ヶー一-龠\s]/g;

    // 정규 표현식을 사용하여 특수문자 제거
    return inputString.replace(regex, "");
};

//검색 조건
const includesSearch = (writeStr, originStr) => {
    const removeSpacesRegex = /[\s　]/g;

    console.log("writeStr", writeStr);
    console.log("originStr", originStr);

    const searchTerm = writeStr.replace(removeSpacesRegex, "").toLowerCase();
    const originName = originStr.replace(removeSpacesRegex, "").toLowerCase();

    //writeStr, originName이 비어있는 경우에 대한 처리 추가
    if (
        originName === null ||
        originName === "" ||
        writeStr === null ||
        writeStr === ""
    ) {
        return {
            partialMatch: false,
            includesTxt: false,
        };
    }

    // 짧은 길이를 기준으로 부분 일치 확인
    const minLength = Math.min(searchTerm.length, originName.length);
    const partialMatch =
        searchTerm.slice(0, minLength) === originName.slice(0, minLength);

    // 부분 일치 확인
    const includesSearchQuery1 = originName.includes(searchTerm);
    const includesSearchQuery2 = searchTerm.includes(originName);

    // 일본어인지 체크
    if (wanakana.isJapanese(writeStr)) {
        // 히라가나로 변환하여 비교
        const hiraganaSearchTerm = wanakana.toHiragana(searchTerm);
        const hiraganaOriginName = wanakana.toHiragana(originName);

        const hiraganaPartialMatch =
            hiraganaSearchTerm.slice(0, minLength) ===
            hiraganaOriginName.slice(0, minLength);

        const hiraganaIncludesSearchQuery1 =
            hiraganaOriginName.includes(hiraganaSearchTerm);
        const hiraganaIncludesSearchQuery2 =
            hiraganaSearchTerm.includes(hiraganaOriginName);

        return {
            partialMatch: hiraganaPartialMatch,
            includesTxt:
                hiraganaIncludesSearchQuery1 || hiraganaIncludesSearchQuery2,
        };
    }

    const includesTxt = includesSearchQuery1 || includesSearchQuery2;

    return {
        partialMatch,
        includesTxt,
    };
};

//금영,태진 번호로 Music데이터 가져오기
const musicFindAllByNumber = async (keumyong, taejin) => {
    let data = await Music.findAll({
        where: {
            [Op.or]: [
                {
                    keumyong: keumyong == "" ? "KEUMYONG" : keumyong,
                },
                {
                    taejin: taejin == "" ? "TAEJIN" : taejin,
                },
            ],
        },
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        raw: true,
    });
    if (data) {
        return data;
    }
};

const musicTagFindBySearchStr = async (where, searchStr) => {
    const MusicData = await Music.findAll({
        // where,
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
                                [Op.like]: `%${decodeURIComponent(searchStr)}%`,
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
                    exclude: ["createdAt", "updatedAt", "deletedAt", "s_delYN"],
                },
                required: false, // 연결된 값이 없어도 가져오기
            },
            {
                model: Category,
                attributes: {
                    include: ["name"],
                    exclude: ["createdAt", "updatedAt", "deletedAt", "c_delYN"],
                },
                required: false, // 연결된 값이 없어도 가져오기
            },
        ],
        // raw: true, //true할경우 같은 아이디 리스트 중복으로 내려옴
    });

    return MusicData;
};

const arrayFilterSameData = (AList, BList, filterColum) => {
    const [shorterArray, longerArray] =
        AList.length > BList.length ? [BList, AList] : [AList, BList];

    // id가 같은 오브젝트 필터링
    const uniqueObjects = longerArray.filter((obj1) => {
        const obj2 = shorterArray.find(
            (obj) => obj[filterColum] === obj1[filterColum]
        );
        // if (obj2) {
        if (obj2) {
            obj1.Tags = obj2.Tags || []; // obj2.Tags가 없다면 빈 배열로 초기화
            return false; // 중복되는 경우 필터링
        }

        return true; // 중복되지 않는 경우 유지
    });

    // shorterArray와 uniqueObjects를 합치기
    const combinedArray = [...shorterArray, ...uniqueObjects];
    const sortedCombinedArray = combinedArray.sort((a, b) => b.id - a.id);
    return sortedCombinedArray;
};

//해시태그 저장, 음악 - 태그간 관계 데이터 추가
const createUpdateMusicTag = async (type, tags, createMusic) => {
    const hashtags = tags.match(/#[^\s#]+/g); //해시태그 찾는 정규표현식

    console.log("hashtags", hashtags);
    if (hashtags) {
        const tagResult = await Promise.all(
            hashtags.map(
                (tag) =>
                    // Hashtag.create({ name : tag.slice(1).toLowerCase() }) 이렇게 저장하면 중복저장된다.
                    Tag.findOrCreate({
                        where: {
                            name: tag.slice(1).toLowerCase(),
                            // .replace(" ", "")
                            // .replace(",", ""),
                        },
                    }) //중복안하고 저장
                //findOrCreate : where로 검색 후 저장. 없을때만 등록 있으면 가져옴.
            )
        );

        // console.log("tagResult======", tagResult);
        switch (type) {
            case "CREATE":
                await createMusic.addTag(tagResult.map((v) => v[0]));
                break;
            case "UPDATE":
                //수정한 음악의 id를 들고와서 다시 tag 관계성 저장.
                const reloadedMusic = await Music.findByPk(musicData.id);
                await reloadedMusic.addTag(tagResult.map((v) => v[0].id));
                break;
            default:
                break;
        }
    }
};

const createUpdateLink = async (type, links, createMusic) => {
    if (links !== undefined || links !== "") {
        let res;
        const linksList = links.split(",");
        if (linksList.length > 0) {
            const linkResult = await Promise.all(
                linksList.map(async (l) => {
                    // 링크가 https://로 시작하지 않으면 추가하지 않음

                    if (!l.startsWith("https://")) {
                        res = false;
                        return res;
                    } else {
                        return Link.create({
                            src: l.replace(",", ""),
                            MusicId: createMusic.id,
                        });
                    }
                })
            );

            switch (type) {
                case "CREATE":
                    break;
                case "UPDATE":
                    break;
                default:
                    break;
            }
        }
    }
};

const updateBoardMusicId = async (beforeData, newData) => {
    let updateForm = {};
    let searchForm = [];

    //기존 데이터일경우
    if (beforeData.length > 0) {
        updateForm.MusicId = beforeData[0].id;
        searchForm = [
            {
                b_keumyong: beforeData[0].keumyong,
            },
            {
                b_taejin: beforeData[0].taejin,
            },
        ];
    }

    //새 데이터일경우
    if (newData !== undefined) {
        updateForm.MusicId = newData.id;
        searchForm = [
            {
                b_keumyong: newData.keumyong,
            },
            {
                b_taejin: newData.taejin,
            },
        ];
    }

    await Board.update(updateForm, {
        where: {
            [Op.or]: searchForm,
        },
        raw: true,
        returning: true, // 업데이트된 데이터를 반환
    });
};

module.exports = {
    removeSpecialCharacters,
    includesSearch,
    musicFindAllByNumber,
    musicTagFindBySearchStr,
    arrayFilterSameData,
    createUpdateMusicTag,
    createUpdateLink,
    updateBoardMusicId,
};
