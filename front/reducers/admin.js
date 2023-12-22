import produce from "../util/produce";
export const initalState = {
    insertCategoryLoading: false, //카테고리 추가
    insertCategoryDone: false,
    insertCategoryError: null,
    insertCategory: null,
    insertSingerLoading: false,
    insertSingerDone: false,
    insertSingerError: null,
    insertSinger: null,
};

//작성==================================================================

//요청 카테고리 추가
export const INSERT_CATEGORY_REQUEST = "INSERT_CATEGORY_REQUEST";
export const INSERT_CATEGORY_SUCCESS = "INSERT_CATEGORY_SUCCESS";
export const INSERT_CATEGORY_FAILURE = "INSERT_CATEGORY_FAILURE";

//요청 가수 추가
export const INSERT_SINGER_REQUEST = "INSERT_SINGER_REQUEST";
export const INSERT_SINGER_SUCCESS = "INSERT_SINGER_SUCCESS";
export const INSERT_SINGER_FAILURE = "INSERT_SINGER_FAILURE";

const reducer = (state = initalState, action) => {
    return produce(state, (d) => {
        const draft = d;
        switch (action.type) {
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
            default:
                break;
        }
    });
};

export default reducer;
