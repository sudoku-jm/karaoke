import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import music from "./music";
const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			console.log("HYDRATE", HYDRATE);
			return action.payload;
		default: {
			const combineReducer = combineReducers({
				music,
			});
			return combineReducer(state, action);
		}
	}
};

export default rootReducer;
