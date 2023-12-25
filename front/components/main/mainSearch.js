import React, { useCallback, useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { Validation } from "../../func/common";
import { useRouter } from "next/router";
import { SEARCH_MUSIC_LIST_REQUREST } from "../../reducers/music";

const MainSearch = ({ setSchFlag }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [schTxt, handleChange, setSchTxt] = useInput("");
	// const [schFlag, setSchFlag] = useState(true);

	// useEffect(() => {
	//     const delayTime = 500;
	//     let timer;

	//     if (timer) {
	//         clearTimeout(timer);
	//     }

	//     const refetch = () => {
	//         dispatch({
	//             type: SEARCH_MUSIC_LIST_REQUREST,
	//             schTxt,
	//         });
	//     };

	//     //검색 API 호출
	//     if (!Validation.isEmpty(schTxt)) {
	//         timer = setTimeout(refetch, delayTime);
	//     }

	//     return () => {
	//         clearTimeout(timer);
	//     };
	// }, [schFlag]);

	// //검색 클릭
	// const handleSubmit = useCallback(
	//     (e) => {
	//         if (
	//             (e.type == "keyup" && e.code == "Enter") ||
	//             (e.type == "click" && e.target.name == "schButton")
	//         ) {
	//             setSchFlag(!schFlag);
	//         }
	//     },
	//     [schTxt]
	// );

	const handleSubmit = useCallback(
		(e) => {
			if (
				(e.type == "keyup" && e.code == "Enter") ||
				(e.type == "click" && e.target.name == "schButton")
			) {
				if (!Validation.isEmpty(schTxt)) {
					// setSchFlag(true);
					router.push(`/search/${schTxt}`);
				}
			}
		},
		[schTxt],
	);

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
