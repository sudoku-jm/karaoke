import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import Top from "../../components/form/top";
import { BOARD_INFO_REQUEST } from "../../reducers/music";
import { Validation } from "../../func/common";
import { useDispatch } from "react-redux";
import BoardDetailCon from "../../components/board/boardDetailCon";
//요청 상세 정보 페이지
const RequestInfo = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const id = router.query?.id;
	console.log("id??", id);

	//상세 페이지 정보 API 호출
	useEffect(() => {
		if (
			!Validation.isEmpty(id) &&
			id !== undefined &&
			id !== "null" &&
			id !== null
		) {
			let timer;
			const delay = 200;

			if (timer) {
				clearTimeout(timer);
			}
			const callAPI = () => {
				dispatch({
					type: BOARD_INFO_REQUEST,
					id,
				});
			};
			timer = setTimeout(callAPI, delay);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [id]);
	return (
		<AppLayout>
			<Top insertType="BOARD_DETAIL" />
			<BoardDetailCon />
		</AppLayout>
	);
};

export default RequestInfo;
