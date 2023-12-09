import produce from "../util/produce";
export const initalState = {
	insertWriteCall: false,
	insertWriteType: null,
	insertMusicLoading: false,
	insertMusicDone: false,
	insertMusicResult: null,
	insertMusicError: null,
	getCategoryLoading: false,
	getCategoryDone: false,
	getCategoryError: null,
	categoryList: null,
	searchCategoryLoading: false,
	searchCategoryDone: false,
	searchCategoryError: null,
	searchCategoryList: null,
	searchSingerLoading: false,
	searchSingerDone: false,
	searchSingerError: null,
	searchSingerList: null,
};

//곡 쓰기 요청 클릭
export const INSERT_MUSIC_WRITE_REQUEST = "INSERT_MUSIC_WRITE_REQUEST";
export const INSERT_MUSIC_WRITE_RESET = "INSERT_MUSIC_WRITE_RESET";
//글쓰기 요청 액션
export const handleInsert = (insertType) => ({
	type: INSERT_MUSIC_WRITE_REQUEST,
	data: insertType,
});
export const handleInsertReset = () => ({
	type: INSERT_MUSIC_WRITE_RESET,
});

//곡 요청
export const INSERT_BOARD_REQUEST = "INSERT_BOARD_REQUEST";
export const INSERT_BOARD_SUCCESS = "INSERT_BOARD_SUCCESS";
export const INSERT_BOARD_FAILURE = "INSERT_BOARD_FAILURE";

//카테고리 리스트 가져오기
export const GET_CATEGORY_REQUEST = "GET_CATEGORY_REQUEST";
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_FAILURE = "GET_CATEGORY_FAILURE";
export const handleGetCategoryList = () => ({
	type: GET_CATEGORY_REQUEST,
});

//카테고리 검색
export const SEARCH_CATEGORY_REQUEST = "SEARCH_CATEGORY_REQUEST";
export const SEARCH_CATEGORY_SUCCESS = "SEARCH_CATEGORY_SUCCESS";
export const SEARCH_CATEGORY_FAILURE = "SEARCH_CATEGORY_FAILURE";

//가수 검색
export const SEARCH_SINGER_REQUEST = "SEARCH_SINGER_REQUEST";
export const SEARCH_SINGER_SUCCESS = "SEARCH_SINGER_SUCCESS";
export const SEARCH_SINGER_FAILURE = "SEARCH_SINGER_FAILURE";

const reducer = (state = initalState, action) => {
	return produce(state, (d) => {
		const draft = d;
		switch (action.type) {
			case INSERT_MUSIC_WRITE_REQUEST:
				draft.insertWriteCall = true;
				draft.insertWriteType = action.data;
				break;
			case INSERT_MUSIC_WRITE_RESET:
				draft.insertWriteCall = false;
				draft.insertWriteType = null;
				break;
			//글쓰기 api 호출
			case INSERT_BOARD_REQUEST:
				draft.insertMusicLoading = true;
				break;
			case INSERT_BOARD_SUCCESS:
				draft.insertMusicLoading = false;
				draft.insertMusicDone = true;
				draft.insertMusicResult = action.data;
				break;
			case INSERT_BOARD_FAILURE:
				draft.insertMusicLoading = false;
				draft.insertMusicDone = false;
				draft.insertMusicError = action.error;
				break;
			//카테고리 리스트 가져오기
			case GET_CATEGORY_REQUEST:
				draft.getCategoryLoading = true;
				break;
			case GET_CATEGORY_SUCCESS:
				draft.getCategoryLoading = false;
				draft.getCategoryDone = true;
				draft.categoryList = action.data;
				break;
			case GET_CATEGORY_FAILURE:
				draft.getCategoryLoading = false;
				draft.getCategoryDone = false;
				draft.getCategoryError = action.error;
				break;
			//카테고리 검색
			case SEARCH_CATEGORY_REQUEST:
				draft.searchCategoryLoading = true;
				draft.searchCategoryDone = false;
				break;
			case SEARCH_CATEGORY_SUCCESS:
				draft.searchCategoryLoading = false;
				draft.searchCategoryDone = true;
				draft.searchCategoryList = action.data;
				break;
			case SEARCH_CATEGORY_FAILURE:
				draft.searchCategoryLoading = false;
				draft.searchCategoryDone = false;
				draft.searchCategoryList = null;
				draft.searchCategoryError = action.error;
				break;
			//가수 검색
			case SEARCH_SINGER_REQUEST:
				draft.searchSingerLoading = true;
				draft.searchSingerDone = false;
				break;
			case SEARCH_SINGER_SUCCESS:
				draft.searchSingerLoading = false;
				draft.searchSingerDone = true;
				draft.searchSingerList = action.data;
				break;
			case SEARCH_SINGER_FAILURE:
				draft.searchSingerLoading = false;
				draft.searchSingerDone = false;
				draft.searchSingerList = null;
				draft.searchSingerError = action.error;
				break;
			default:
				break;
		}
	});
};

export default reducer;
