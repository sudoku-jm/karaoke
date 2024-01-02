import axios from "axios";
import { all, fork } from "redux-saga/effects";
import musicSaga from "./music";
import adminSaga from "./admin";
import { backUrl } from "../config/config";

export default function* rootSaga() {
    axios.defaults.baseURL = backUrl;
    axios.defaults.withCredentials = true;
    yield all([fork(musicSaga)]);
    yield all([fork(adminSaga)]);
}
