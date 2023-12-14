import React, { useCallback, useEffect, useState } from "react";
import Menu from "../menu/Menu";
import Top from "./top";
import { useDispatch, useSelector } from "react-redux";
import { INSERT_BOARD_REQUEST, handleInsertReset } from "../../reducers/music";
import SearchCategory from "./searchCategory";
import board from "../../func/board";
import SearchSinger from "./searchSinger";
import { Validaion } from "../../func/common";

const formInit = {
    categoryId: "",
    categoryName: "",
    title: "",
    singerId: "",
    singerName: "",
    singerEName: "",
    singerJName: "",
    keumyong: "",
    taejin: "",
    link: "",
    tag: "",
    tags: "",
    new: "",
    contents: "",
    musicId: "",
};

const WriteForm = ({ insertType }) => {
    const dispatch = useDispatch();
    const {
        insertWriteCall,
        insertWriteType,
        insertMusicDone,
        insertMusicError,
    } = useSelector((state) => state.music);
    const [insertForm, setInsertForm] = useState(formInit);
    //작성 타입 폼 설정
    useEffect(() => {
        if (insertType !== undefined) {
            let settingForm = {};
            switch (insertType) {
                case "NEW":
                    settingForm.new = "Y";
                    break;
                case "MODIFT":
                    settingForm.new = "N";
                    settingForm.musicId = "";
                    break;
                default:
                    break;
            }
            setInsertForm({
                ...insertForm,
                ...settingForm,
            });
        }
    }, [insertType]);

    useEffect(() => {
        //임시
        console.log("insertForm!!!", insertForm);
    }, [insertForm]);

    //요청 프로세스1  : 요청 버튼 클릭하면 요청API 호출
    useEffect(() => {
        if (insertWriteCall && insertWriteType !== null) {
            //정규식 체크
            const result = board.ValidationInsertBoard(insertType, insertForm);
            if (result) {
                console.log("insertForm", insertForm);
                console.log("insertType", insertType);
                dispatch({
                    type: INSERT_BOARD_REQUEST,
                    data: {
                        form: insertForm,
                        insertType,
                    },
                });
            }
        }
    }, [insertWriteCall]);

    //요청 프로세스2 : 요청 결과 받은 후 요청 버튼 리셋
    useEffect(() => {
        if (insertMusicDone || insertMusicError) {
            dispatch(handleInsertReset());
        }
    }, [insertMusicDone, insertMusicError]);

    //작성
    const handleInput = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        switch (name) {
            case "tag":
                newValue = newValue.replaceAll(
                    /\b(\w+)\b|,|#+/g,
                    (match, p1) => {
                        if (match === "#") {
                            return "";
                        } else {
                            return "";
                        }
                    }
                );
                break;
            case "keumyong":
            case "taejin":
                newValue = Validaion.inputOnlyNum(newValue);
                break;
            default:
                break;
        }
        setInsertForm((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    }, []);

    const handleAddTags = useCallback(
        (e) => {
            if (e.type == "click" || (e.code == "Comma" && e.type == "keyup")) {
                if (insertForm.tag !== "") {
                    const beforeTags = insertForm.tags;
                    const updateTag = `#${insertForm.tag}`;
                    const tags = beforeTags + updateTag;
                    console.log(beforeTags + updateTag);
                    setInsertForm((prev) => ({
                        ...prev,
                        tag: "",
                        tags,
                    }));
                }
            }
        },
        [insertForm.tags]
    );

    return (
        <section>
            <Top insertType={insertType} />
            <SearchCategory onChangeForm={setInsertForm} />
            <SearchSinger onChangeForm={setInsertForm} />
            <input
                type="text"
                name="title"
                placeholder="노래 제목"
                onChange={handleInput}
            />
            <input
                type="text"
                name="keumyong"
                value={insertForm.keumyong}
                placeholder="금영번호"
                maxLength={10}
                onChange={handleInput}
            />
            <input
                type="text"
                name="taejin"
                value={insertForm.taejin}
                placeholder="태진번호"
                maxLength={10}
                onChange={handleInput}
            />
            <input
                type="text"
                name="link"
                placeholder="유튜브 MR링크"
                onChange={handleInput}
            />
            <br />
            <input
                type="text"
                name="tag"
                value={insertForm.tag}
                placeholder="추가할 태그명"
                onChange={handleInput}
                onKeyUp={handleAddTags}
            />
            <button onClick={handleAddTags}>태그추가</button>
            <div>{insertForm.tags}</div>
            <textarea
                name="contents"
                maxLength={150}
                placeholder="뭘 검색하면 이 곡이 나오면 좋을지 제안좀 해주세요."
                onChange={handleInput}
            ></textarea>
            {/* <Menu /> */}
        </section>
    );
};

export default WriteForm;
