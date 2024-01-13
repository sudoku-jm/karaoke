import React, { useEffect, useState } from "react";
import BoardListRequest from "../../components/board/boardListRequest";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { GET_BOARD_LIST_REQUEST } from "../../reducers/music";
import {
	INSERT_CATEGORY_REQUEST,
	INSERT_MUSIC_REQUEST,
	INSERT_SINGER_REQUEST,
	handleInsertCategoryReset,
	handleInsertMusicReset,
	handleInsertSingerReset,
} from "../../reducers/admin";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { BoardRequestListStyle } from "../../style/ContentStyle";
import AppLayout from "../../components/AppLayout";
import { Validation } from "../../func/common";
import Link from "next/link";

const index = () => {
	const { getBoardListLoading, hasMoreBoardList, getBoardList } = useSelector(
		(state) => state.music,
	);
	const {
		insertCategoryError,
		insertCategory,
		insertCategoryDone,
		insertSingerError,
		insertSinger,
		insertSingerDone,
		insertMusicError,
		insertMusic,
		insertMusicDone,
	} = useSelector((state) => state.admin);
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
		if (insertCategoryError) {
			alert(insertCategoryError.msg);
			dispatch(handleInsertCategoryReset());
		}
		if (insertSingerError) {
			alert(insertSingerError.msg);
			dispatch(handleInsertSingerReset());
		}
		if (insertMusicError) {
			alert(insertMusicError.msg);
			dispatch(handleInsertMusicReset());
		}
	}, [insertCategoryError, insertSingerError, insertMusicError]);

	useEffect(() => {
		if (insertCategoryDone) {
			alert("등록 완료 : " + insertCategory.name);
			dispatch(handleInsertCategoryReset());
		}
		if (insertSingerDone) {
			alert("등록 완료");
			dispatch(handleInsertSingerReset());
		}
		if (insertMusicDone) {
			alert("등록 완료");
			dispatch(handleInsertMusicReset());
		}
	}, [insertCategoryDone, insertSingerDone, insertMusicDone]);

	useEffect(() => {
		if (getBoardList !== null) {
			setList(getBoardList);
		}
	}, [getBoardList]);

	//카테고리 추가
	const handleInsertCategory = (id, cateName) => {
		dispatch({
			type: INSERT_CATEGORY_REQUEST,
			data: {
				boardId: !Validation.isEmpty(id) ? id : "",
				name: cateName,
			},
		});
	};

	//가수 추가
	const handleInsertSinger = (id, name, eName, jName) => {
		dispatch({
			type: INSERT_SINGER_REQUEST,
			data: {
				boardId: !Validation.isEmpty(id) ? id : "",
				name: name,
				e_name: eName,
				j_name: jName,
			},
		});
	};

	//음악 추가
	const handleInsertMusic = (board) => {
		const form = {
			categoryId: board.CategoryId,
			categoryName: board.Category?.name,
			singerId: board.SingerId,
			singerName: board.Singer?.name,
			singerEName: board.Singer?.e_name,
			singerJName: board.Singer?.j_name,
			title: board.b_title,
			keumyong: board.b_keumyong,
			taejin: board.b_taejin,
			link: board.b_link,
			contents: board.b_contents,
			tags: board.b_tags,
			new: board.new,
			musicId: board.MusicId,
			boardId: board.id,
		};
		dispatch({
			type: INSERT_MUSIC_REQUEST,
			data: form,
		});
	};

	return (
		<AppLayout>
			<Link href="/">메인으로</Link>
			<BoardRequestListStyle>
				<h3>곡 추가/수정 요청 리스트</h3>

				{list !== null && (
					<table>
						<colgroup>
							<col width="auto" />
							<col width="auto" />
							<col width="auto" />
							<col width="auto" />
							<col width="auto" />
							<col width="6%" />
							<col width="auto" />
							<col width="auto" />
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
							{list.map((board) => {
								return (
									<BoardListRequest
										key={board.id}
										pageType="ADMIN"
										board={board}
										handleInsertCategory={handleInsertCategory}
										handleInsertSinger={handleInsertSinger}
										handleInsertMusic={handleInsertMusic}
									/>
								);
							})}
						</tbody>
					</table>
				)}
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
	},
);

export default index;
