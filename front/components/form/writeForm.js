import React, { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import Top from "./top";
import { useDispatch, useSelector } from "react-redux";
import { INSERT_MUSIC_REQUEST, handleInsertReset } from "../../reducers/music";

const formInit = {
	category: "",
	title: "",
	singer: "",
	keumyong: "",
	taejin: "",
	link: "",
	contents: "",
};

const WriteForm = () => {
	const dispatch = useDispatch();
	const {
		insertWriteCall,
		insertWriteType,
		insertMusicDone,
		insertMusicError,
	} = useSelector((state) => state.music);
	const [insertForm, setInsertForm] = useState(formInit);
	//요청 프로세스1  : 요청 버튼 클릭하면 요청API 호출
	useEffect(() => {
		if (insertWriteCall && insertWriteType !== null) {
			dispatch({
				type: INSERT_MUSIC_REQUEST,
				data: {
					form: insertForm,
					insertType: insertWriteType,
				},
			});
		}
	}, [insertWriteCall]);

	//요청 프로세스2 : 요청 결과 받은 후 요청 버튼 리셋
	useEffect(() => {
		if (insertMusicDone || insertMusicError) {
			dispatch(handleInsertReset());
		}
	}, [insertMusicDone, insertMusicError]);
	return (
		<section>
			<Top pageTitle="신곡 요청" insertType="NEW" />
			<select name="category">
				<option>카테고리</option>
			</select>
			<input type="text" name="title" placeholder="제목" />
			<input type="text" name="singer" placeholder="가수" />
			<input type="text" name="keumyong" placeholder="금영번호" />
			<input type="text" name="taejin" placeholder="태진번호" />
			<input type="text" name="link" placeholder="유튜브 MR링크" />
			<textarea
				name="contents"
				maxLength={150}
				placeholder="뭘 검색하면 이 곡이 나오면 좋을지 제안좀 해주세요."
			></textarea>

			<Menu />
		</section>
	);
};

export default WriteForm;
