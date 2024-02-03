import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Validation } from "../../func/common";
import { useDispatch } from "react-redux";
import {
	MUSIC_CHAN_INFO_REQUEST,
	MUSIC_INFO_REQUEST,
} from "../../reducers/music";

import AppLayout from "../../components/AppLayout";
import Top from "../../components/form/top";
import SearchDetailCon from "../../components/search/searchDetailCon";
//음악 상세 정보 페이지
const MusicInfo = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const id = router.query?.musicId;
	const schTxt = router.query?.schTxt;
	const [flag, setFlag] = useState(true);

	//상세 페이지 정보 API 호출
	useEffect(() => {
		if (
			!Validation.isEmpty(id) &&
			id !== undefined &&
			id !== "null" &&
			id !== null
		) {
			dispatch({
				type: MUSIC_INFO_REQUEST,
				id,
			});
			dispatch({
				type: MUSIC_CHAN_INFO_REQUEST,
				id,
			});

			setFlag(!flag);
		} else {
			router.push("/");
		}
	}, [id]);

	return (
		<AppLayout>
			<Top insertType="MUSIC_DETAIL" flag={flag} />
			<SearchDetailCon schTxt={schTxt} />
		</AppLayout>
	);
};

export default MusicInfo;
