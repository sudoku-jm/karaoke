import React, { useCallback, useState } from "react";
import useInput from "../../hooks/useInput";

const MainSearch = () => {
	const [schTxt, handleChange, setSchTxt] = useInput("");

	//검색 클릭
	const handleSubmit = (e) => {
		if (
			(e.type == "keyup" && e.code == "Enter") ||
			(e.type == "click" && e.target.name == "schButton")
		) {
			//검색 API 호출
			console.log("검색!");
		}
	};

	return (
		<div>
			<input
				type="text"
				value={schTxt}
				name="sch-txt"
				onChange={handleChange}
				onKeyUp={handleSubmit}
			/>
			<button name="schButton" onClick={handleSubmit}>
				검색
			</button>
		</div>
	);
};

export default MainSearch;
