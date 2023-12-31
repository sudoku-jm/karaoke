import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";
import axios from "axios";
import {
	SEARCH_CATEGORY_FAILURE,
	SEARCH_CATEGORY_REQUEST,
	SEARCH_CATEGORY_SUCCESS,
	INSERT_BOARD_FAILURE,
	INSERT_BOARD_REQUEST,
	INSERT_BOARD_SUCCESS,
	GET_CATEGORY_REQUEST,
	GET_CATEGORY_SUCCESS,
	GET_CATEGORY_FAILURE,
	SEARCH_SINGER_REQUEST,
	SEARCH_SINGER_SUCCESS,
	SEARCH_SINGER_FAILURE,
	GET_BOARD_LIST_SUCCESS,
	GET_BOARD_LIST_FAILURE,
	GET_BOARD_LIST_REQUEST,
	SEARCH_MUSIC_LIST_REQUREST,
	SEARCH_MUSIC_LIST_SUCCESS,
	SEARCH_MUSIC_LIST_FAILURE,
	MUSIC_INFO_REQUEST,
	MUSIC_INFO_SUCCESS,
	MUSIC_INFO_FAILURE,
	MUSIC_CHAN_INFO_REQUEST,
	MUSIC_CHAN_INFO_SUCCESS,
	MUSIC_CHAN_INFO_FAILURE,
} from "../reducers/music";
import { queryStringFunc } from "../func/common";

// 추가/수정 요청글 작성
function insertBoardAPI(data) {
	return axios.post("/music/insertBoard", data.form);
}

function* insertBoard(action) {
	try {
		const result = yield call(insertBoardAPI, action.data);
		console.log("insertBoardAPI result", result);
		if (result.status == 200) {
			yield put({
				type: INSERT_BOARD_SUCCESS,
				data: result.data.data,
			});
		} else {
			yield put({
				type: INSERT_BOARD_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {
		yield put({
			type: INSERT_BOARD_FAILURE,
			error: err,
		});
	}
}

//카테고리 검색 및 리스트 가져오기
function searchCategoryAPI(data) {
	return axios.post("/music/searchCategory", data);
}

function* searchCategory(action) {
	try {
		const result = yield call(searchCategoryAPI, action.data);
		console.log("searchCategoryAPI result", result);
		if (result.status == 200) {
			yield put({
				type: SEARCH_CATEGORY_SUCCESS,
				data: result.data.data,
			});
		} else {
			yield put({
				type: SEARCH_CATEGORY_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {
		console.error(err);
	}
}

//카테고리 리스트 전체 가져오기
function getCategoryAPI(data) {
	return axios.get("/music/getCategoryList", data);
}

function* getCategory() {
	try {
		const result = yield call(getCategoryAPI);
		console.log("getCategoryAPI result", result);
		if (result.status == 200) {
			yield put({
				type: GET_CATEGORY_SUCCESS,
				data: result.data,
			});
		} else {
			yield put({
				type: GET_CATEGORY_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {
		console.error(err);
	}
}

//가수 검색 및 리스트 가져오기
function searchSingerAPI(data) {
	return axios.post("/music/searchSinger", data);
}

function* searchSinger(action) {
	try {
		const result = yield call(searchSingerAPI, action.data);
		console.log("searchSingerAPI result", result);
		if (result.status == 200) {
			yield put({
				type: SEARCH_SINGER_SUCCESS,
				data: result.data.data,
			});
		} else {
			yield put({
				type: SEARCH_SINGER_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {
		console.error(err);
	}
}

//요청리스트 가져오기
function boardListAPI(lastId) {
	return axios.get(`/music/getBoardList?lastId=${lastId || 0}`);
}

function* boardList(action) {
	try {
		const result = yield call(boardListAPI, action.lastId);
		console.log("boardListAPI result", result);
		if (result.status == 200) {
			yield put({
				type: GET_BOARD_LIST_SUCCESS,
				data: result.data.data,
			});
		} else {
			yield put({
				type: GET_BOARD_LIST_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {
		console.error(err);
	}
}

//음악 검색 리스트
function searchMusicListAPI(data) {
	// return axios.get(
	// 	`/music/searchMusicList?searchStr=${data.schTxt || ""}&lastId=${
	// 		data.lastId || 0
	// 	}`,
	// );
	return axios.get(
		`/music/searchMusicList3?searchStr=${data.schTxt || ""}&lastId=${
			data.lastId
		}`,
	);
}

function* searchMusicList(action) {
	try {
		const result = yield call(searchMusicListAPI, action.data);
		console.log("searchMusicListAPI result", result);
		if (result.status == 200) {
			yield put({
				type: SEARCH_MUSIC_LIST_SUCCESS,
				data: result.data.data,
			});
		} else {
			yield put({
				type: SEARCH_MUSIC_LIST_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {
		console.error(err);
	}
}
//음악 상세 정보
function musicInfoAPI(id) {
	return axios.get(`/music/musicInfo?id=${id || ""}`);
}

function* musicInfo(action) {
	try {
		const result = yield call(musicInfoAPI, action.id);
		console.log("musicInfoAPI result", result);
		if (result.status == 200) {
			yield put({
				type: MUSIC_INFO_SUCCESS,
				data: result.data.data,
			});
		} else {
			yield put({
				type: MUSIC_INFO_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {
		console.error(err);
	}
}

//음악 연관 상세 정보
function musicChanInfoAPI(id) {
	return axios.get(`/music/musicChanInfo?id=${id || ""}`);
}

function* musicChanInfo(action) {
	try {
		const result = yield call(musicChanInfoAPI, action.id);
		console.log("musicChanInfoAPI result", result);
		if (result.status == 200) {
			yield put({
				type: MUSIC_CHAN_INFO_SUCCESS,
				data: result.data.data,
			});
		} else {
			yield put({
				type: MUSIC_CHAN_INFO_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {
		console.error(err);
	}
}

//watch
function* watchInsertMusic() {
	yield takeLatest(INSERT_BOARD_REQUEST, insertBoard);
}
function* watchSearchCategory() {
	yield takeLatest(SEARCH_CATEGORY_REQUEST, searchCategory);
}
function* watchgetCategory() {
	yield takeLatest(GET_CATEGORY_REQUEST, getCategory);
}
function* watchSearchSinger() {
	yield takeLatest(SEARCH_SINGER_REQUEST, searchSinger);
}
function* watchBoardList() {
	yield throttle(200, GET_BOARD_LIST_REQUEST, boardList);
}
function* watchSearchMusicList() {
	yield takeLatest(SEARCH_MUSIC_LIST_REQUREST, searchMusicList);
}
function* watchMusicInfo() {
	yield takeLatest(MUSIC_INFO_REQUEST, musicInfo);
}
function* watchMusicChanInfo() {
	yield takeLatest(MUSIC_CHAN_INFO_REQUEST, musicChanInfo);
}

export default function* musicSaga() {
	yield all([fork(watchInsertMusic)]);
	yield all([fork(watchSearchCategory)]);
	yield all([fork(watchgetCategory)]);
	yield all([fork(watchSearchSinger)]);
	yield all([fork(watchBoardList)]);
	yield all([fork(watchSearchMusicList)]);
	yield all([fork(watchMusicInfo)]);
	yield all([fork(watchMusicChanInfo)]);
}
