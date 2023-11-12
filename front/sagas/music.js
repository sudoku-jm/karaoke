import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";
import axios from "axios";
import {
	INSERT_MUSIC_FAILURE,
	INSERT_MUSIC_REQUEST,
	INSERT_MUSIC_SUCCESS,
} from "../reducers/music";

function insertWriteAPI(data) {
	if (data.insertType == "NEW") {
		//새로 요청
		return axios.post("/music/insert", data.form);
	} else {
		//수정 요청
		return axios.post("/music/modify", data.form);
	}
}

function* insertMusic(action) {
	try {
		const result = yield call(insertWriteAPI, action.data);
		console.log("insertWriteAPI result", result);
		if (result.status == 200) {
			yield put({
				type: INSERT_MUSIC_SUCCESS,
			});
		} else {
			yield put({
				type: INSERT_MUSIC_FAILURE,
				error: result.response,
			});
		}
	} catch (err) {}
}

//watch
function* watchInsertMusic() {
	yield takeLatest(INSERT_MUSIC_REQUEST, insertMusic);
}

export default function* musicSaga() {
	yield all([fork(watchInsertMusic)]);
}
