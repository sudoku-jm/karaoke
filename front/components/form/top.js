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
		dispatch(handleInsert(insertType));
	}, [insertType]);
	return (
		<header>
			<h2>{form.pageTitle}</h2>

			<button onClick={handleWirteClick}>요청</button>
		</header>
	);
};

export default Top;
