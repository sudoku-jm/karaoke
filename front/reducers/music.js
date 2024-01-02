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
    getBoardListLoading: false, //요청리스트 불러오기
    getBoardListDone: false,
    getBoardListError: null,
    getBoardList: [],
    hasMoreBoardList: true, //더이상 불러올게 없을 경우 false
    searchMusicListLoading: false, //검색
    searchMusicListDone: false,
    searchMusicListError: null,
    searchMusicList: [],
    musicInfoLoading: false,
    musicInfoDone: false,
    musicInfoError: false,
    musicInfo: false,
    musicChanInfoLoading: false,
    musicChanInfoDone: false,
    musicChanInfoError: false,
    musicChanInfo: false,
    popualarKeywordRankLoading: false,
    popualarKeywordRankDone: false,
    popualarKeywordRankError: null,
    popualarKeywordRank: null,
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

//작성==================================================================
//곡 요청(작성)
export const INSERT_BOARD_REQUEST = "INSERT_BOARD_REQUEST";
export const INSERT_BOARD_SUCCESS = "INSERT_BOARD_SUCCESS";
export const INSERT_BOARD_FAILURE = "INSERT_BOARD_FAILURE";
export const INSERT_BOARD_RESET = "INSERT_BOARD_RESET";

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

//요청 리스트==================================================================
//요청 리스트 가져오기
export const GET_BOARD_LIST_REQUEST = "GET_BOARD_LIST_REQUEST";
export const GET_BOARD_LIST_SUCCESS = "GET_BOARD_LIST_SUCCESS";
export const GET_BOARD_LIST_FAILURE = "GET_BOARD_LIST_FAILURE";

//메인 검색==================================================================
//검색(메인 검색)
export const SEARCH_MUSIC_LIST_REQUREST = "SEARCH_MUSIC_LIST_REQUREST";
export const SEARCH_MUSIC_LIST_SUCCESS = "SEARCH_MUSIC_LIST_SUCCESS";
export const SEARCH_MUSIC_LIST_FAILURE = "SEARCH_MUSIC_LIST_FAILURE";

//음악 정보=================================================================
export const MUSIC_INFO_REQUEST = "MUSIC_INFO_REQUEST";
export const MUSIC_INFO_SUCCESS = "MUSIC_INFO_SUCCESS";
export const MUSIC_INFO_FAILURE = "MUSIC_INFO_FAILURE";
//음악 연관 정보=================================================================
export const MUSIC_CHAN_INFO_REQUEST = "MUSIC_CHAN_INFO_REQUEST";
export const MUSIC_CHAN_INFO_SUCCESS = "MUSIC_CHAN_INFO_SUCCESS";
export const MUSIC_CHAN_INFO_FAILURE = "MUSIC_CHAN_INFO_FAILURE";

//실시간 인기검색 키워드=======================================================
export const POPUALAR_SEARCH_KEYWORD_REQUEST =
    "POPUALAR_SEARCH_KEYWORD_REQUEST";
export const POPUALAR_SEARCH_KEYWORD_SUCCESS =
    "POPUALAR_SEARCH_KEYWORD_SUCCESS";
export const POPUALAR_SEARCH_KEYWORD_FAILURE =
    "POPUALAR_SEARCH_KEYWORD_FAILURE";

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
            case INSERT_BOARD_RESET:
                draft.insertMusicResult = null;
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
            //요청 리스트 가져오기
            case GET_BOARD_LIST_REQUEST:
                draft.getBoardListLoading = true;
                draft.getBoardListDone = false;
                break;
            case GET_BOARD_LIST_SUCCESS:
                draft.getBoardListLoading = false;
                draft.getBoardListDone = true;
                draft.getBoardList = draft.getBoardList.concat(action.data);
                draft.hasMoreBoardList = action.data.length >= 5;
                break;
            case GET_BOARD_LIST_FAILURE:
                draft.getBoardListLoading = false;
                draft.getBoardListDone = false;
                draft.getBoardListError = action.error;
                draft.getBoardList = null;
                break;
            case SEARCH_MUSIC_LIST_REQUREST:
                draft.searchMusicListLoading = true;
                draft.searchMusicListDone = false;
                // draft.searchMusicList = [];
                break;
            case SEARCH_MUSIC_LIST_SUCCESS:
                draft.searchMusicListLoading = false;
                draft.searchMusicListDone = true;
                draft.searchMusicList = draft.searchMusicList.concat(
                    action.data
                );
                // draft.searchMusicList = [...action.data, ...draft.searchMusicList];
                draft.hasMoreBoardList = action.data.length >= 5;

                break;
            case SEARCH_MUSIC_LIST_FAILURE:
                draft.searchMusicListLoading = false;
                draft.searchMusicListError = action.error;
                draft.searchMusicList = [];
                break;
            //음악 상세 정보
            case MUSIC_INFO_REQUEST:
                draft.musicInfoLoading = true;
                draft.musicInfoDone = false;
                break;
            case MUSIC_INFO_SUCCESS:
                draft.musicInfoLoading = false;
                draft.musicInfoDone = true;
                draft.musicInfo = action.data;
                break;
            case MUSIC_INFO_FAILURE:
                draft.musicInfoLoading = false;
                draft.musicInfoError = action.error;
                draft.musicInfo = null;
                break;
            //음악 상세 정보
            case MUSIC_CHAN_INFO_REQUEST:
                draft.musicChanInfoLoading = true;
                draft.musicChanInfoDone = false;
                break;
            case MUSIC_CHAN_INFO_SUCCESS:
                draft.musicChanInfoLoading = false;
                draft.musicChanInfoDone = true;
                draft.musicChanInfo = action.data;
                break;
            case MUSIC_CHAN_INFO_FAILURE:
                draft.musicChanInfoLoading = false;
                draft.musicChanInfoError = action.error;
                draft.musicChanInfo = null;
                break;
            case POPUALAR_SEARCH_KEYWORD_REQUEST:
                draft.popualarKeywordRankLoading = true;
                draft.popualarKeywordRankDone = false;
                break;
            case POPUALAR_SEARCH_KEYWORD_SUCCESS:
                draft.popualarKeywordRankLoading = false;
                draft.popualarKeywordRankDone = true;
                draft.popualarKeywordRank = action.data;
                break;
            case POPUALAR_SEARCH_KEYWORD_FAILURE:
                draft.popualarKeywordRankLoading = false;
                draft.popualarKeywordRankDone = true;
                draft.popualarKeywordRank = null;
                draft.popualarKeywordRankError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;
