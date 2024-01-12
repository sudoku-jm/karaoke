import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_SINGER_REQUEST } from "../../reducers/music";
import { Validation } from "../../func/common";
import { SearchWriteStyle } from "../../style/ContentStyle";

const SearchSinger = ({ insertForm, onChangeForm }) => {
    const dispatch = useDispatch();
    const { searchSingerLoading, searchSingerDone, searchSingerList } =
        useSelector((state) => state.music);
    const [form, setForm] = useState({
        singerName: "",
        singerEName: "",
        singerJName: "",
        singerList: [], //검색한 가수 리스트
        selectedSinger: {}, // 선택한 가수 데이터
    });
    const [visible, setVisible] = useState({
        searchSingerListVisible: false,
    });

    //[수정] 가수 데이터 넣기
    useEffect(() => {
        if (!Validation.isEmpty(insertForm.singerName)) {
            setForm((prev) => ({
                ...prev,
                singerId: insertForm.SingerId,
                selectedSinger: {
                    name: insertForm.singerName,
                    e_name: insertForm.singerEName,
                    j_name: insertForm.singerJName,
                },
            }));
        }
    }, [insertForm]);

    const getSinger = useCallback(
        (name) => {
            if (name == "") {
                setVisible({
                    ...visible,
                    searchSingerListVisible: false,
                });
            }
            if (name !== "" && !searchSingerLoading) {
                dispatch({
                    type: SEARCH_SINGER_REQUEST,
                    data: {
                        singerName: name,
                    },
                });
            }
        },
        [form.singerName]
    );

    //검색 결과
    useEffect(() => {
        if (searchSingerDone) {
            setForm((prev) => ({
                ...prev,
                singerList: searchSingerList !== null ? searchSingerList : [],
            }));
            if (searchSingerList !== null) {
                setVisible({
                    ...visible,
                    searchSingerListVisible: true,
                });
            }
        }
    }, [searchSingerDone]);

    //카테고리 작성 이벤트 -> 검색호출
    useEffect(() => {
        let timer;
        const delay = 200;

        if (timer) {
            clearTimeout(timer);
        }
        const callAPI = () => {
            getSinger(form.singerName);
        };
        timer = setTimeout(callAPI, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [form.singerName]);

    //검색 엔터
    const handleEnter = useCallback(
        (e) => {
            if (e.code === "Enter") {
                getSinger(form.singerName);
            }
        },
        [form.singerName]
    );

    //작성
    const handleInput = useCallback((e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    //가수 선택
    const handleSelectSinger = (item) => {
        setForm((prev) => ({
            ...prev,
            singerName: "",
            singerEName: "",
            singerJName: "",
            selectedSinger: item,
        }));
        setVisible({
            ...visible,
            searchSingerListVisible: false,
        });
        onChangeForm((prev) => ({
            ...prev,
            singerId: item.id !== 0 ? item.id : "",
            singerName: item.name,
            singerEName: item.e_name,
            singerJName: item.j_name,
        }));
    };

    //선택된것 지우기
    const handleRemoveSelected = () => {
        setForm((prev) => ({
            ...prev,
            selectedSinger: {},
        }));
        onChangeForm((prev) => ({
            ...prev,
            singerId: "",
            singerName: "",
            singerEName: "",
            singerJName: "",
        }));
    };

    return (
        <SearchWriteStyle $type="singer">
            <div className="selected-area">
                {Object.keys(form.selectedSinger).length > 0 ? (
                    <div className="selected-item">
                        <p className="ko">{form.selectedSinger.name}</p>
                        {!Validation.isEmpty(form.selectedSinger.e_name) && (
                            <p className="en">{form.selectedSinger.e_name}</p>
                        )}
                        {!Validation.isEmpty(form.selectedSinger.j_name) && (
                            <p className="jp">{form.selectedSinger.j_name}</p>
                        )}

                        <button onClick={handleRemoveSelected}>삭제</button>
                    </div>
                ) : (
                    <div className="form-input">
                        <input
                            type="text"
                            name="singerName"
                            value={form.singerName}
                            onChange={handleInput}
                            placeholder="가수 검색"
                            onKeyUp={handleEnter}
                        />
                    </div>
                )}
            </div>

            {visible.searchSingerListVisible && (
                <div className="search-result-list">
                    {form.singerList.length > 0 && (
                        <>
                            <label>가수 선택</label>
                            <ul>
                                {form.singerList.map((list) => (
                                    <li key={list.id}>
                                        <div
                                            className="search-result-item"
                                            onClick={() =>
                                                handleSelectSinger(list)
                                            }
                                        >
                                            <span>
                                                <em>가수명</em>
                                                {list.name}
                                            </span>

                                            <span>
                                                <em>영어</em> {list.j_name}
                                            </span>
                                            <span>
                                                <em>일본어</em> {list.e_name}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    <div className="user-write-area">
                        <p>검색 리스트에 없어요 직접 작성할래요</p>
                        <div className="user-write-item">
                            <label>직접작성</label>
                            <input
                                type="text"
                                name="singerName"
                                value={form.singerName}
                                onChange={handleInput}
                                placeholder="가수 한국어명"
                            />

                            <input
                                type="text"
                                name="singerEName"
                                value={form.singerEName}
                                onChange={handleInput}
                                placeholder="가수 영문명"
                            />

                            <input
                                type="text"
                                name="singerJName"
                                value={form.singerJName}
                                onChange={handleInput}
                                placeholder="가수 일본어명"
                            />
                            <button
                                onClick={() =>
                                    handleSelectSinger({
                                        id: 0,
                                        name: form.singerName,
                                        e_name: form.singerEName,
                                        j_name: form.singerJName,
                                    })
                                }
                            >
                                이걸로 할래요
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SearchWriteStyle>
    );
};

export default SearchSinger;
