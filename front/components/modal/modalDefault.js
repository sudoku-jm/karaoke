import React, { useEffect, useState } from "react";
import { ModalDefaultStyle } from "../../style/ContentStyle";
import { useSelector } from "react-redux";

const ModalDefault = () => {
	const {
		insertCategoryError,
		insertCategoryDone,
		insertSingerError,
		insertSingerDone,
		insertMusicError,
		insertMusicDone,
	} = useSelector((state) => state.admin);

	const [visible, setVisible] = useState({
		modalVisible: false,
	});
	const [msg, setMsg] = useState("");

	useEffect(() => {
		const errors = [insertCategoryError, insertMusicError, insertSingerError];
		const dones = [insertCategoryDone, insertSingerDone, insertMusicDone];

		for (const error of errors) {
			if (error) {
				setMsg(error.msg);
				setVisible((prev) => ({
					...prev,
					modalVisible: true,
				}));
				break;
			}
		}
		for (const done of dones) {
			if (done) {
				setMsg("등록 완료");
				setVisible((prev) => ({
					...prev,
					modalVisible: true,
				}));
				break;
			}
		}
	}, [
		insertMusicError,
		insertSingerError,
		insertCategoryError,
		insertCategoryDone,
		insertSingerDone,
		insertMusicDone,
	]);

	const handleModalClick = (state) => {
		switch (state) {
			case "CLOSE":
				setVisible((prev) => ({
					...prev,
					modalVisible: false,
				}));
				break;
		}
	};
	return (
		<>
			{visible.modalVisible && (
				<ModalDefaultStyle $w="400">
					<div className="con">
						<p>{msg}</p>
					</div>
					<div className="bottom">
						<button onClick={() => handleModalClick("CLOSE")}>닫기</button>
					</div>
				</ModalDefaultStyle>
			)}
		</>
	);
};

export default ModalDefault;
