import React, { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import Top from "./top";
import { useDispatch, useSelector } from "react-redux";
import { INSERT_BOARD_REQUEST, handleInsertReset } from "../../reducers/music";
import SearchCategory from "./searchCategory";
import board from "../../func/board";
import SearchSinger from "./searchSinger";

const formInit = {
	categoryId: "",
	categoryName: "",
	title: "",
	singerId: "",
	singerName: "",
	singerEName: "",
	singerJName: "",
	keumyong: "",
	taejin: "",
	link: "",
	tags: "",
	new: "",
	contents: "",
	musicId: "",
};

const WriteForm = ({ insertType }) => {
	const dispatch = useDispatch();
	const {
		insertWriteCall,
		insertWriteType,
		insertMusicDone,
		insertMusicError,
	} = useSelector((state) => state.music);
	const [insertForm, setInsertForm] = useState(formInit);
	//작성 타입 폼 설정
	useEffect(() => {
		if (insertType !== undefined) {
			let settingForm = formInit;
			switch (insertType) {
				case "NEW":
					settingForm.new = "Y";
					break;
				case "MODIFT":
					settingForm.new = "N";
					settingForm.musicId = "";
					break;
				default:
					break;
			}
		}
		setInsertForm({
			...insertForm,
		});
	}, [insertType]);

	//요청 프로세스1  : 요청 버튼 클릭하면 요청API 호출
	useEffect(() => {
		if (insertWriteCall && insertWriteType !== null) {
			//정규식 체크
			const result = board.ValidationInsertBoard(insertType, insertForm);
			if (result) {
				dispatch({
					type: INSERT_BOARD_REQUEST,
					data: {
						form: insertForm,
						insertType,
					},
				});
			}
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
			<Top insertType={insertType} />
			<SearchCategory onChangeForm={setInsertForm} />
			<SearchSinger onChangeForm={setInsertForm} />
			{/* 
			<input type="text" name="title" placeholder="제목" />
			<input type="text" name="keumyong" placeholder="금영번호" />
			<input type="text" name="taejin" placeholder="태진번호" />
			<input type="text" name="link" placeholder="유튜브 MR링크" />
			<textarea
				name="contents"
				maxLength={150}
				placeholder="뭘 검색하면 이 곡이 나오면 좋을지 제안좀 해주세요."
			></textarea> */}

			{/* <Menu /> */}
		</section>
	);
};

export default WriteForm;
