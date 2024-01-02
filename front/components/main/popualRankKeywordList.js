import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POPUALAR_SEARCH_KEYWORD_REQUEST } from "../../reducers/music";
import Link from "next/link";
import moment from "moment";

const PopualRankKeywordList = () => {
    const dispatch = useDispatch();
    const { popualarKeywordRank } = useSelector((state) => state.music);
    const [rankList, setRankList] = useState([]);
    // 3시간 전의 시간
    const threeHoursAgo = moment()
        .subtract(3, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
    const getPopualKeywordRank = () => {
        dispatch({
            type: POPUALAR_SEARCH_KEYWORD_REQUEST,
        });
    };
    useEffect(() => {
        let timer;
        const delay = 400;

        if (timer) {
            clearTimeout(timer);
        }
        const callAPI = () => {
            getPopualKeywordRank();
        };
        timer = setTimeout(callAPI, delay);

        return () => {
            clearTimeout(timer);
        };
    }, []);
    useEffect(() => {
        if (popualarKeywordRank !== null) {
            setRankList(popualarKeywordRank);
        }
    }, [popualarKeywordRank]);

    return (
        <div>
            실시간 인기 검색 키워드
            {`3시간 전(${threeHoursAgo}) ~ 현재 까지 집계)`}
            <br />
            {rankList.map((item) => (
                <span key={item.id}>
                    <Link href={`/search/${item.word}`}>#{item.word}</Link>
                </span>
            ))}
        </div>
    );
};

export default PopualRankKeywordList;
