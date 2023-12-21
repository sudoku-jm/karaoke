import React, { useEffect } from "react";
import BoardListRequest from "../../components/board/boardListRequest";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { GET_BOARD_LIST_REQUEST } from "../../reducers/music";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { BoardRequestListStyle } from "../../style/ContentStyle";
import AppLayout from "../../components/AppLayout";

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
        <AppLayout>
            <BoardRequestListStyle>
                <h3>곡 추가/수정 요청 리스트</h3>
                <table>
                    <colgroup>
                        <col style={{width:"auto;"}}/>
                        <col style={{width:"auto;"}}/>
                        <col style={{width:"auto;"}}/>
                        <col style={{width:"auto;"}}/>
                        <col style={{width:"auto;"}}/>
                        <col style={{width:"auto;"}}/>
                        <col style={{width:"10%;"}}/>
                        <col style={{width:"auto;"}}/>
                        <col style={{width:"auto;"}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>요청</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>가수</th>
                            <th>금영번호</th>
                            <th>태진번호</th>
                            <th>태그</th>
                            <th>유튜브 링크</th>
                            <th>의견</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>

                    {getBoardList !== null &&
                        getBoardList.map((board) => {
                            return (
                                <BoardListRequest
                                board={board}
                                key={board.id}
                                />
                                );
                            })}
                    </tbody>
                </table>
            </BoardRequestListStyle>
            <div
                ref={hasMoreBoardList && !getBoardListLoading ? ref : undefined}
                style={{ height: 10, background: "red" }}
            ></div>
        </AppLayout>
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
