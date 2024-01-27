import React, { useEffect, useState } from "react";
import { SearchDetailContainerStyle } from "../../style/ContentStyle";
import MusicDetail from "../music/musicDetail";
import MusicDetailOtherList from "../music/musicDatailOtherList";
import { useSelector } from "react-redux";

const SearchDetailCon = () => {
	const { musicInfoDone, musicInfo, musicChanInfoDone, musicChanInfo } =
		useSelector((state) => state.music);
	const [music, setMusic] = useState({});
	const [musicList, setMusicList] = useState({
		tagCateList: [],
		singerList: [],
	});

	useEffect(() => {
		if (musicInfoDone) {
			setMusic(musicInfo.resultData);
		}
		if (musicChanInfoDone) {
			setMusicList((prev) => ({
				tagCateList: musicChanInfo.musicUniqDataList,
				singerList: musicChanInfo.musicSingerList,
			}));
		}
	}, [musicInfoDone, musicChanInfoDone]);
	return (
		<SearchDetailContainerStyle>
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

			{/* {musicList.singerList?.length > 0 && (
				<>
					<h3>연관 가수 음악</h3>
					{musicList.singerList?.map((item) => (
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
							<Link href={`/music/${item.id}`}>상세보기</Link>
						</div>
					))}
				</>
			)} */}
		</SearchDetailContainerStyle>
	);
};

export default SearchDetailCon;
