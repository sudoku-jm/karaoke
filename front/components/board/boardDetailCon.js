import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Validation } from "../../func/common";
import MusicInfo from "../music/musicInfo";
import { DetailContainerStyle } from "../../style/ContentStyle";
import BoardInfo from "./boardInfo";

const tabList = [
	{ name: "요청 노래 정보", key: "REQUEST" },
	{ name: "등록된 노래 정보", key: "ORIGIN" },
];

const BoardDetailCon = () => {
	const { boardInfo, boardInfoDone } = useSelector((state) => state.music);
	const [boardData, setBoardData] = useState({
		beforeData: null,
		requestData: null,
	});
	const [tab, setTab] = useState({
		request: true,
		origin: false,
	});
	const [nowTab, setNowTab] = useState("REQUEST");
	useEffect(() => {
		if (boardInfoDone && boardInfo !== null) {
			const before =
				boardInfo.beforeMusicData == null ? null : boardInfo.beforeMusicData;
			const request = Validation.isEmptyObject(boardInfo.resultData)
				? null
				: boardInfo.resultData;
			setBoardData((prev) => ({
				...prev,
				beforeData: before,
				requestData: request,
			}));
		}
	}, [boardInfoDone]);

	const handleTabClick = (type) => {
		let actionType = "";
		const updateTabState = {};
		for (const key in tab) {
			updateTabState[key] = false;
		}
		switch (type) {
			case "REQUEST":
				actionType = "request";
				break;
			case "ORIGIN":
				actionType = "origin";
				break;
			default:
				break;
		}
		updateTabState[actionType] = true;
		setTab(updateTabState);
		setNowTab(actionType);
	};

	return (
		<DetailContainerStyle>
			<ul className="tab-handler">
				{tabList.map((item) => (
					<li
						key={item.key}
						className={item.key == nowTab.toUpperCase() ? "on" : ""}
					>
						<button onClick={() => handleTabClick(item.key)}>
							{item.name}
						</button>
					</li>
				))}
			</ul>
			<article className="tab-contents">
				{tab.request && (
					<div className="tab-con">
						{boardData.requestData !== null ? (
							<>
								<h3>요청 노래 정보</h3>
								<BoardInfo music={boardData.requestData} />
							</>
						) : (
							<p className="none">정보가 없습니다</p>
						)}
					</div>
				)}
				{tab.origin && (
					<div className="tab-con">
						{boardData.beforeData !== null ? (
							<>
								<h3>등록된 노래 정보</h3>
								<MusicInfo music={boardData.beforeData} />
							</>
						) : (
							<p className="none">등록된 정보가 없습니다</p>
						)}
					</div>
				)}
			</article>
		</DetailContainerStyle>
	);
};

export default BoardDetailCon;
