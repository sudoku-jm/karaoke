import React, { useEffect, useState } from "react";
import { DetailContainerStyle } from "../../style/ContentStyle";
import MusicDetail from "../music/musicDetail";
import MusicDetailOtherList from "../music/musicDatailOtherList";
import { useSelector } from "react-redux";

const SearchDetailCon = ({ schTxt }) => {
	const { musicInfoDone, musicInfo, musicChanInfoDone, musicChanInfo } =
		useSelector((state) => state.music);
	const [music, setMusic] = useState({});
	const [musicList, setMusicList] = useState({
		tagCateList: [],
		singerList: [],
	});

	useEffect(() => {
		if (musicInfoDone && musicInfo.resultData !== null) {
			setMusic(musicInfo.resultData);

			console.log("musicInfo.resultData", musicInfo.resultData);

			sessionStorage.setItem("musicId", musicInfo.resultData.id);
			sessionStorage.setItem("schTxt", schTxt);
			sessionStorage.setItem("musicTitle", musicInfo.resultData.title);
			sessionStorage.setItem("isList", false);
		}
		if (musicChanInfoDone) {
			setMusicList((prev) => ({
				...prev,
				tagCateList: musicChanInfo.musicUniqDataList,
				singerList: musicChanInfo.musicSingerList,
			}));
		}
	}, [musicInfoDone, musicChanInfoDone]);
	return (
		<DetailContainerStyle>
			{musicInfo !== null && <MusicDetail music={music} />}
			{musicChanInfo !== null && (
				<div className="others-wrap">
					{musicList.tagCateList?.length > 0 && (
						<>
							<h3>연관 카테고리 음악</h3>
							<MusicDetailOtherList
								dataType="UNIQDATA"
								dataList={musicList.tagCateList}
							/>
						</>
					)}

					{musicList.singerList?.length > 0 && (
						<>
							<h3>연관 가수 음악</h3>
							<MusicDetailOtherList
								dataType="SINGER"
								dataList={musicList.singerList}
							/>
						</>
					)}
				</div>
			)}
		</DetailContainerStyle>
	);
};

export default SearchDetailCon;
