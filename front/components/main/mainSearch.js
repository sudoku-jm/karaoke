import React, { useCallback, useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import { Validation } from "../../func/common";
import { useRouter } from "next/router";
import { SearchAreaStyle } from "../../style/ContentStyle";

const MainSearch = ({ queryString, pageType }) => {
	const router = useRouter();
	const [schTxt, handleChange, setSchTxt] = useInput("");

	useEffect(() => {
		if (!Validation.isEmpty(queryString)) {
			setSchTxt(queryString);
		}
	}, [queryString]);

	const handleSubmit = useCallback(
		(e) => {
			if (
				(e.type == "keyup" && e.code == "Enter") ||
				(e.type == "click" && e.target.name == "schButton")
			) {
				if (!Validation.isEmpty(schTxt)) {
					router.push(`/search/${schTxt}`);
				}
			}
		},
		[schTxt],
	);

	return (
		<SearchAreaStyle $pageType={pageType}>
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
		</SearchAreaStyle>
	);
};

export default MainSearch;
