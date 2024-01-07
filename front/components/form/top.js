import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleInsert } from "../../reducers/music";

const Top = ({ insertType }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		pageTitle: "",
	});

	// top 제목 타입 설정
	useEffect(() => {
		if (insertType !== undefined && insertType !== "") {
			let title = "";
			switch (insertType) {
				case "NEW":
					title = "신곡 요청";
					break;
				case "MODIFY":
					title = "수정 요청";
					break;
				default:
					break;
			}
			setForm({
				...form,
				pageTitle: title,
			});
		}
	}, [insertType]);

	//요청
	const handleWirteClick = useCallback(() => {
		if (confirm("요청하시겠습니까?")) {
			dispatch(handleInsert(insertType));
		}
	}, [insertType]);

	//취소
	const handleCancelClick = () => {
		//검색리스트로 돌아가기
		//수정하기 누를 때 해당 페이지 주소 로컬이나 세션스토리지에 저장.
		//돌아가기 누르면 삭제
		//해당 데이터가 없으면 메인으로 이동
	};
	return (
		<header>
			{insertType == "MODIFY" && (
				<button obClick={handleCancelClick} className="cancel">
					취소
				</button>
			)}
			<h2>{form.pageTitle}</h2>

			<button onClick={handleWirteClick} className="insert">
				요청
			</button>
		</header>
	);
};

export default Top;
