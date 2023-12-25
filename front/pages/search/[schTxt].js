import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { Validation } from "../../func/common";
import { SEARCH_MUSIC_LIST_REQUREST } from "../../reducers/music";
import MusicItem from "../../components/music/musicItem";
import AppLayout from "../../components/AppLayout";
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
	const [schFlag, setSchFlag] = useState(false);

	useEffect(() => {
		let flag = schFlag ? schFlag : hasMoreBoardList;
		if (
			inView &&
			flag &&
			!searchMusicListLoading &&
			!Validation.isEmpty(schTxt)
		) {
			let lastId;
			if (searchMusicList.length > 0) {
				lastId = searchMusicList[searchMusicList.length - 1]?.id;
			} else {
				lastId = 0;
			}
			dispatch({
				type: SEARCH_MUSIC_LIST_REQUREST,
				data: { schTxt, lastId },
			});
		}
	}, [
		inView,
		hasMoreBoardList,
		searchMusicListLoading,
		searchMusicList,
		schTxt,
		schFlag,
	]);

	useEffect(() => {
		if (searchMusicListDone) {
			setSchFlag(false);
		}
	}, [searchMusicListDone]);

	return (
		<AppLayout>
			<MainSearch setSchFlag={setSchFlag} />
			<div>
				{searchMusicList.length > 0 && !searchMusicListLoading
					? searchMusicList.map((music, idx) => (
							<MusicItem key={idx} music={music} schTxt={schTxt} />
					  ))
					: `${schTxt}의 노래 정보가 없습니다.`}
			</div>

			<div
				ref={hasMoreBoardList && !searchMusicListLoading ? ref : undefined}
				style={{ height: 100, background: "red" }}
			></div>
		</AppLayout>
	);
};

export default SearchResult;
