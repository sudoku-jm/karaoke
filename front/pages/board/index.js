import React, { useEffect } from "react";
import BoardListRequest from "../../components/board/boardListRequest";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { GET_BOARD_LIST_REQUEST } from "../../reducers/music";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

const index = () => {
    const { getBoardListLoading, hasMoreBoardList, getBoardList } = useSelector(
        (state) => state.music
    );
    const [ref, inView] = useInView();
    const dispatch = useDispatch();
    useEffect(() => {
        if (inView && hasMoreBoardList && !getBoardListLoading) {
            let lastId = getBoardList[getBoardList.length - 1]?.id;
            dispatch({
                type: GET_BOARD_LIST_REQUEST,
                lastId,
            });
        }
    }, [inView, hasMoreBoardList, getBoardListLoading, getBoardList]);

    return (
        <>
            <h3>곡 추가/수정 요청 리스트</h3>
            <dl>
                <dt>
                    <span>카테고리</span>
                    <span>제목</span>
                    <span>가수</span>
                    <span>금영번호</span>
                    <span>태진번호</span>
                    <span>태그</span>
                    <span>유튜브 링크</span>
                    <span>의견</span>
                    <span>-</span>
                </dt>
                {getBoardList !== null &&
                    getBoardList.map((board) => {
                        return (
                            <BoardListRequest board={board} key={board.id} />
                        );
                    })}
            </dl>
            <div
                ref={hasMoreBoardList && !getBoardListLoading ? ref : undefined}
                style={{ height: 10, background: "red" }}
            ></div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        const cookie = context.req ? context.req.headers.cookie : "";

        axios.defaults.headers.Cookie = "";
        if (context.req && cookie) {
            axios.defaults.headers.Cookie = cookie;
        }

        context.store.dispatch({
            type: GET_BOARD_LIST_REQUEST,
        });

        context.store.dispatch(END);
        await context.store.sagaTask.toPromise();

        return {};
    }
);

export default index;
