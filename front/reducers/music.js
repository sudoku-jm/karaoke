import produce from "../util/produce";
export const initalState = {
	insertWriteCall: false,
	insertWriteType: null,
	insertMusicLoading: false,
	insertMusicDone: false,
	insertMusicError: null,
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
export const INSERT_MUSIC_REQUEST = "INSERT_MUSIC_REQUEST";
export const INSERT_MUSIC_SUCCESS = "INSERT_MUSIC_SUCCESS";
export const INSERT_MUSIC_FAILURE = "INSERT_MUSIC_FAILURE";

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
			case INSERT_MUSIC_REQUEST:
				draft.insertMusicLoading = true;
				break;
			case INSERT_MUSIC_SUCCESS:
				draft.insertMusicLoading = false;
				draft.insertMusicDone = true;
				break;
			case INSERT_MUSIC_FAILURE:
				draft.insertMusicLoading = false;
				draft.insertMusicDone = false;
				draft.insertMusicError = action.error;
				break;
			default:
				break;
		}
	});
};

export default reducer;
