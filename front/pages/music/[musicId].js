import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Validation } from "../../func/common";
import { useDispatch, useSelector } from "react-redux";
import { MUSIC_INFO_REQUEST } from "../../reducers/music";
import { youtubeParser } from "../../func/board";

const MusicInfo = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const id = router.query?.musicId;
	const { musicInfoDone, musicInfo } = useSelector((state) => state.music);
	const [music, setMusic] = useState({});
	const [musicList, setMusicList] = useState([]);

	console.log("id", id);
	useEffect(() => {
		if (!Validation.isEmpty(id) && id !== undefined) {
			dispatch({
				type: MUSIC_INFO_REQUEST,
				id,
			});
		}
	}, [id]);
	useEffect(() => {
		if (musicInfoDone) {
			setMusic(musicInfo.resultData);
			setMusicList(musicInfo.musicUniqDataList);
		}
	}, [musicInfoDone]);
	return (
		<div>
			{musicInfo !== null && (
				<>
					제목 : {music.title}
					<br />
					가수 : {music.Singer?.name} <br />
					가수 : {music.Singer?.e_name} <br />
					가수 : {music.Singer?.j_name}
					<br />
					keumyong : {music.keumyong}
					<br />
					taejin : {music.taejin}
					<br />
					카테고리 : {music.Category?.name}
					<br />
					연관태그 :{" "}
					{music.Tags?.map((tag) => (
						<span key={tag}>#{tag.name}</span>
					))}
					<br />
					유튜브 영상 :{" "}
					{music.Links?.map((link, idx) => (
						<div
							key={idx}
							className="link-lists"
							dangerouslySetInnerHTML={{
								__html: youtubeParser(link.src),
							}}
						></div>
					))}
					<br />
					조회수 : {music.Hit}
					마지막 업데이트 {music.updatedAt}
					<h3>연관 음악</h3>
					{musicList?.map((item) => (
						<div key={item.id}>
							제목 : {item.title}
							<br />
							가수 : {item.Singer?.name}
							<br />
							가수 : {item.Singer?.e_name}
							<br />
							가수 : {item.Singer?.j_name}
							<br />
							카테고리 : {item.Category?.name}
							<br />
							keumyong : {item.keumyong}
							<br />
							taejin : {item.taejin}
							<br />
							<br />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default MusicInfo;
