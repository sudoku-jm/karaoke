import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import reducer from "../reducers";
import rootSaga from "../sagas";

const loggerMiddleware = () => (next) => (action) => {
    next(action);
};

const configureStore = () => {
    // 미들웨어 사용
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleware];
    const enhancer =
        process.env.NEXT_PUBLIC_ENV === "production"
            ? compose(applyMiddleware(...middlewares)) // 운영(배포)용 : 데브툴 연결x
            : composeWithDevTools(applyMiddleware(...middlewares)); // 개발용 : 데브툴 연결 o

    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;

    // dispatch 하는 순간 type과 data가 reducer로 전달된다. 그리고 초기state에서 다음 state가 생성된다.
};
const wrapper = createWrapper(configureStore, {
    debug: process.env.NEXT_PUBLIC_ENV === "development",
}); // 두번째는 옵션객체

export default wrapper;
