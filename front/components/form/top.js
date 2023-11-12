import React from "react";
import { useDispatch } from "react-redux";
import { handleInsert } from "../../reducers/music";

const Top = ({ pageTitle, insertType }) => {
	const dispatch = useDispatch();
	const handleWirteClick = () => {
		switch (insertType) {
			case "NEW":
				break;
			case "MODIFY":
				break;
			default:
				break;
		}

		dispatch(handleInsert(insertType));
	};
	return (
		<>
			<h2>{pageTitle}</h2>
			{insertType !== undefined && (
				<button onClick={handleWirteClick}>요청</button>
			)}
		</>
	);
};

export default Top;
