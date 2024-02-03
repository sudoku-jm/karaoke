import React, { useEffect, useState } from "react";
import BoardListRequest from "../../components/board/boardListRequest";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { GET_BOARD_LIST_REQUEST } from "../../reducers/music";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
	BoardRequestListStyle,
	SearchListContainerStyle,
} from "../../style/ContentStyle";
import AppLayout from "../../components/AppLayout";
import Top from "../../components/form/top";

const index = () => {
	const { getBoardListLoading, hasMoreBoardList, getBoardList } = useSelector(
		(state) => state.music,
	);

	const [list, setList] = useState(null);
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

	useEffect(() => {
		if (getBoardList !== null) {
			setList(getBoardList);
		}
	}, [getBoardList]);

	return (
		<AppLayout>
			<Top insertType="BOARD" />

			<SearchListContainerStyle>
				<div className="list-con">
					<BoardRequestListStyle>
						{list !== null && (
							<ul>
								{list.map((board) => {
									return (
										<BoardListRequest
											key={board.id}
											pageType="BOARD"
											board={board}
										/>
									);
								})}
							</ul>
						)}
					</BoardRequestListStyle>
				</div>
			</SearchListContainerStyle>
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
	},
);

export default index;
