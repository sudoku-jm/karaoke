import React, { useEffect } from "react";
import WriteForm from "../../components/form/writeForm";
import { useRouter } from "next/router";
import AppLayout from "../../components/AppLayout";
import { Container } from "../../style/ContentStyle";
import { useDispatch } from "react-redux";
import { MUSIC_INFO_REQUEST } from "../../reducers/music";
import { Validation } from "../../func/common";

const MusicModify = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const musicId = router.query?.id;

	useEffect(() => {
		if (!Validation.isEmpty(musicId) && musicId !== undefined) {
			dispatch({
				type: MUSIC_INFO_REQUEST,
				id: musicId,
			});
		}
	}, [musicId]);

	return (
		<AppLayout>
			<Container>
				<WriteForm insertType="MODIFY" />
			</Container>
		</AppLayout>
	);
};

export default MusicModify;
