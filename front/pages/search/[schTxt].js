import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_MUSIC_LIST_REQUREST } from "../../reducers/music";
import AppLayout from "../../components/AppLayout";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import Top from "../../components/form/top";
import SearchCon from "../../components/search/searchCon";

const SearchResult = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { searchMusicList, hasMoreBoardList, searchMusicListLoading } =
		useSelector((state) => state.music);
	const [ref, inView] = useInView();
	const { schTxt } = router.query;

	useEffect(() => {
		if (inView && hasMoreBoardList && !searchMusicListLoading) {
			let lastId = searchMusicList[searchMusicList.length - 1]?.id;

			dispatch({
				type: SEARCH_MUSIC_LIST_REQUREST,
				data: { schTxt, lastId },
			});
		}
	}, [inView, hasMoreBoardList, searchMusicListLoading, searchMusicList]);

	return (
		<AppLayout>
			<Top insertType="SEARCH" />

			<SearchCon
				schTxt={schTxt}
				searchMusicList={searchMusicList}
				searchMusicListLoading={searchMusicListLoading}
			/>
			<div
				ref={hasMoreBoardList && !searchMusicListLoading ? ref : undefined}
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
			type: SEARCH_MUSIC_LIST_REQUREST,
			data: {
				schTxt: context.query?.schTxt,
			},
		});

		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();

		return {};
	},
);

export default SearchResult;
