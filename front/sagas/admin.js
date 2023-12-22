import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";
import axios from "axios";
import {
    INSERT_CATEGORY_REQUEST,
    INSERT_CATEGORY_SUCCESS,
    INSERT_CATEGORY_FAILURE,
    INSERT_SINGER_REQUEST,
    INSERT_SINGER_SUCCESS,
    INSERT_SINGER_FAILURE,
} from "../reducers/admin";
import { queryStringFunc } from "../func/common";

//요청 카테고리 추가
function insertCategoryAPI(data) {
    return axios.post(`/admin/insertCategory`, data);
}

function* insertCategory(action) {
    try {
        const result = yield call(insertCategoryAPI, action.data);
        console.log("insertCategoryAPI result", result);
        if (result.status == 200) {
            yield put({
                type: INSERT_CATEGORY_SUCCESS,
                data: result.data.data,
            });
        } else {
            yield put({
                type: INSERT_CATEGORY_FAILURE,
                error: result.data,
            });
        }
    } catch (err) {
        console.error(err);
    }
}

//요청 가수 추가
function insertSingerAPI(data) {
    return axios.post(`/admin/insertSinger`, data);
}

function* insertSinger(action) {
    try {
        const result = yield call(insertSingerAPI, action.data);
        console.log("insertSingerAPI result", result);
        if (result.status == 200) {
            yield put({
                type: INSERT_SINGER_SUCCESS,
                data: result.data.data,
            });
        } else {
            yield put({
                type: INSERT_SINGER_FAILURE,
                error: result.data,
            });
        }
    } catch (err) {
        console.error(err);
    }
}

//watch
function* watchInsertCategory() {
    yield takeLatest(INSERT_CATEGORY_REQUEST, insertCategory);
}
function* watchInsertSinger() {
    yield takeLatest(INSERT_SINGER_REQUEST, insertSinger);
}

export default function* musicSaga() {
    yield all([fork(watchInsertCategory)]);
    yield all([fork(watchInsertSinger)]);
}
