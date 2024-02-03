import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Validation } from "../../func/common";
import MusicDetail from "../music/musicDetail";

const BoardDetailCon = () => {
	const { boardInfo, boardInfoDone } = useSelector((state) => state.music);
	const [boardData, setBoardData] = useState({
		beforeData: null,
		requestData: null,
	});

	useEffect(() => {
		if (boardInfoDone && boardInfo !== null) {
			const before = Validation.isEmptyObject(boardInfo.beforeMusicData)
				? null
				: boardInfo.beforeMusicData;
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

	console.log("boardData", boardData);
	return (
		<>
			{boardData.beforeData !== null && (
				<MusicDetail music={boardData.beforeData} />
			)}
		</>
	);
};

export default BoardDetailCon;
