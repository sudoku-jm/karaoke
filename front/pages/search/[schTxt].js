import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import MusicItem from "../../components/music/musicItem";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { Validation } from "../../func/common";
import { SEARCH_MUSIC_LIST_REQUREST } from "../../reducers/music";
import MainSearch from "../../components/main/mainSearch";

const SearchResult = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        searchMusicList,
        searchMusicListDone,
        hasMoreBoardList,
        searchMusicListLoading,
    } = useSelector((state) => state.music);
    const [ref, inView] = useInView();
    const { schTxt } = router.query;

    console.log("schTxt", schTxt);
    useEffect(() => {
        const delayTime = 500;
        let timer;

        if (timer) {
            clearTimeout(timer);
        }

        const refetch = () => {
            dispatch({
                type: SEARCH_MUSIC_LIST_REQUREST,
                schTxt,
            });
        };

        //검색 API 호출
        if (!Validation.isEmpty(schTxt)) {
            timer = setTimeout(refetch, delayTime);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [schTxt]);
    useEffect(() => {
        if (inView && hasMoreBoardList && !searchMusicListLoading) {
            let lastId = searchMusicList[searchMusicList.length - 1]?.id;
        }
    }, [inView, hasMoreBoardList, searchMusicListLoading, searchMusicList]);
    return (
        <AppLayout>
            <MainSearch />
            <div>
                {searchMusicList !== null &&
                searchMusicList.length > 0 &&
                !searchMusicListLoading
                    ? searchMusicList.map((music) => (
                          <MusicItem
                              key={music.id}
                              music={music}
                              schTxt={schTxt}
                          />
                      ))
                    : `${schTxt}의 노래 정보가 없습니다.`}
            </div>

            <div
                ref={
                    searchMusicList && !searchMusicListLoading ? ref : undefined
                }
                style={{ height: 10, background: "red" }}
            ></div>
        </AppLayout>
    );
};

export default SearchResult;
