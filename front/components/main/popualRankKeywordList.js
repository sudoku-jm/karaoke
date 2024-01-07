import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POPUALAR_SEARCH_KEYWORD_REQUEST } from "../../reducers/music";
import Link from "next/link";
import moment from "moment";
import { PopualRankKeywordListStyle } from "../../style/ContentStyle";

const PopualRankKeywordList = () => {
	const dispatch = useDispatch();
	const { popualarKeywordRank } = useSelector((state) => state.music);
	const [rankList, setRankList] = useState([]);
	const [threeHoursAgo, setThreeHoursAgo] = useState(""); // 3시간 전의 시간
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
			setThreeHoursAgo(
				moment().subtract(3, "hours").format("YYYY-MM-DD HH:mm:ss"),
			);
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
		<PopualRankKeywordListStyle>
			<div className="time-zone">
				<span>실시간 인기 검색 키워드</span>
				{threeHoursAgo !== "" && (
					<em>3시간 전({threeHoursAgo}) ~ 현재 까지 집계</em>
				)}
			</div>

			<ul>
				{rankList.map((item) => (
					<li key={item.id}>
						<Link href={`/search/${item.word}`}>#{item.word}</Link>
					</li>
				))}
			</ul>
		</PopualRankKeywordListStyle>
	);
};

export default PopualRankKeywordList;
