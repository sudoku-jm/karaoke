import React from "react";
import MainSearch from "../main/mainSearch";
import MusicItem from "../music/musicItem";
import { SearchListContainerStyle } from "../../style/ContentStyle";

const SearchCon = ({ schTxt, searchMusicList, searchMusicListLoading }) => {
	return (
		<SearchListContainerStyle>
			<MainSearch queryString={schTxt} $pageType="SEARCH" />
			<div>
				{searchMusicList.length > 0 && !searchMusicListLoading
					? searchMusicList.map((music, idx) => (
							<MusicItem key={idx} music={music} schTxt={schTxt} />
					  ))
					: `${schTxt}의 노래 정보가 없습니다.`}
			</div>
		</SearchListContainerStyle>
	);
};

export default SearchCon;
