import React, { useCallback, useEffect, useState } from "react";
import MainSearch from "./mainSearch";
import RankList from "./rankList";
import ButtonWrite from "../form/buttonWrite";
import WriteForm from "../form/writeForm";

const MainCon = () => {
	const [visible, setVisible] = useState({
		visibleWriteForm: false,
	});

	//곡 요청 버튼 클릭 폼 보이기
	const handleWrite = useCallback(() => {
		setVisible((prev) => ({
			...prev,
			visibleWriteForm: !prev.visibleWriteForm,
		}));
	}, []);
	return (
		<>
			<MainSearch />
			<RankList />
			<ButtonWrite handleWrite={handleWrite} />
			{visible.visibleWriteForm && <WriteForm insertType="NEW" />}
		</>
	);
};

export default MainCon;
