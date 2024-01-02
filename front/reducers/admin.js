import produce from "../util/produce";
export const initalState = {
	insertCategoryLoading: false, //카테고리 추가
	insertCategoryDone: false,
	insertCategoryError: null,
	insertCategory: null,
	insertSingerLoading: false, //가수 추가
	insertSingerDone: false,
	insertSingerError: null,
	insertSinger: null,
	insertMusicLoading: false, //음악 추가
	insertMusicDone: false,
	insertMusicError: null,
	insertMusic: null,
};

//작성==================================================================

//요청 카테고리 추가
export const INSERT_CATEGORY_REQUEST = "INSERT_CATEGORY_REQUEST";
export const INSERT_CATEGORY_SUCCESS = "INSERT_CATEGORY_SUCCESS";
export const INSERT_CATEGORY_FAILURE = "INSERT_CATEGORY_FAILURE";
export const INSERT_CATEGORY_RESET = "INSERT_CATEGORY_RESET";
export const handleInsertCategoryReset = () => ({
	type: INSERT_CATEGORY_RESET,
});

//요청 가수 추가
export const INSERT_SINGER_REQUEST = "INSERT_SINGER_REQUEST";
export const INSERT_SINGER_SUCCESS = "INSERT_SINGER_SUCCESS";
export const INSERT_SINGER_FAILURE = "INSERT_SINGER_FAILURE";
export const INSERT_SINGER_RESET = "INSERT_SINGER_RESET";
export const handleInsertSingerReset = () => ({
	type: INSERT_SINGER_RESET,
});

//요청 음악 추가
export const INSERT_MUSIC_REQUEST = "INSERT_MUSIC_REQUEST";
export const INSERT_MUSIC_SUCCESS = "INSERT_MUSIC_SUCCESS";
export const INSERT_MUSIC_FAILURE = "INSERT_MUSIC_FAILURE";
export const INSERT_MUSIC_RESET = "INSERT_MUSIC_RESET";
export const handleInsertMusicReset = () => ({
	type: INSERT_MUSIC_RESET,
});

const reducer = (state = initalState, action) => {
	return produce(state, (d) => {
		const draft = d;
		switch (action.type) {
			//카테고리 추가
			case INSERT_CATEGORY_REQUEST:
				draft.insertCategoryLoading = true;
				draft.insertCategoryDone = false;
				draft.insertCategory = null;
				break;
			case INSERT_CATEGORY_SUCCESS:
				draft.insertCategoryLoading = false;
				draft.insertCategoryDone = true;
				draft.insertCategory = action.data;
				break;
			case INSERT_CATEGORY_FAILURE:
				draft.insertCategoryLoading = false;
				draft.insertCategoryError = action.error;
				draft.insertCategory = null;
				break;
			case INSERT_CATEGORY_RESET:
				draft.insertCategoryLoading = false;
				draft.insertCategoryDone = false;
				draft.insertCategory = null;
				draft.insertCategoryError = null;
				break;
			//가수 추가
			case INSERT_SINGER_REQUEST:
				draft.insertSingerLoading = true;
				draft.insertSingerDone = false;
				draft.insertSinger = null;
				break;
			case INSERT_SINGER_SUCCESS:
				draft.insertSingerLoading = false;
				draft.insertSingerDone = true;
				draft.insertSinger = action.data;
				break;
			case INSERT_SINGER_FAILURE:
				draft.insertSingerLoading = false;
				draft.insertSingerError = action.error;
				draft.insertSinger = null;
				break;
			case INSERT_SINGER_RESET:
				draft.insertSingerLoading = false;
				draft.insertSingerDone = false;
				draft.insertSingerError = null;
				draft.insertSinger = null;
				break;
			//음악추가
			case INSERT_MUSIC_REQUEST:
				draft.insertMusicLoading = true;
				draft.insertMusicDone = false;
				draft.insertMusic = null;
				break;
			case INSERT_MUSIC_SUCCESS:
				draft.insertMusicLoading = false;
				draft.insertMusicDone = true;
				draft.insertMusic = action.data;
				break;
			case INSERT_MUSIC_FAILURE:
				draft.insertMusicLoading = false;
				draft.insertMusicError = action.error;
				draft.insertMusic = null;
				break;
			case INSERT_MUSIC_RESET:
				draft.insertMusicLoading = false;
				draft.insertMusicDone = false;
				draft.insertMusicError = null;
				draft.insertMusic = null;
				break;
			default:
				break;
		}
	});
};

export default reducer;
