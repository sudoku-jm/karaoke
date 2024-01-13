import React, { useCallback, useEffect, useState } from "react";
import MainSearch from "./mainSearch";
import RankList from "./rankList";
import ButtonWrite from "../form/buttonWrite";
import WriteForm from "../form/writeForm";
import { useDispatch } from "react-redux";
import { INSERT_BOARD_RESET } from "../../reducers/music";
import Link from "next/link";
import PopualRankKeywordList from "./popualRankKeywordList";
import { MainContainerStyle } from "../../style/ContentStyle";

const MainCon = () => {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState({
		visibleWriteForm: false,
	});

	//곡 요청 버튼 클릭 폼 보이기
	const handleWrite = useCallback(() => {
		dispatch({
			type: INSERT_BOARD_RESET,
		});
		setVisible((prev) => ({
			...prev,
			visibleWriteForm: !prev.visibleWriteForm,
		}));
	}, []);
	return (
		<MainContainerStyle>
			<h1 className="main__title">intro</h1>
			<MainSearch $pageType="MAIN" />
			<PopualRankKeywordList />
			<RankList />
			<ButtonWrite
				handleWrite={handleWrite}
				formVisible={visible.visibleWriteForm}
			/>
			<Link href="/board">요청리스트</Link>
			{visible.visibleWriteForm && <WriteForm insertType="NEW" />}
		</MainContainerStyle>
	);
};

export default MainCon;
