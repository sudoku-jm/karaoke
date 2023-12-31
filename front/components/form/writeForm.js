import React, { useCallback, useEffect, useState } from "react";
import Menu from "../menu/Menu";
import Top from "./top";
import { useDispatch, useSelector } from "react-redux";
import { INSERT_BOARD_REQUEST, handleInsertReset } from "../../reducers/music";
import SearchCategory from "./searchCategory";
import { board, youtubeParser } from "../../func/board";
import SearchSinger from "./searchSinger";
import { Validation } from "../../func/common";
import InputTagsForm from "./inputTagsForm";
import InputSingNumber from "./inputSingNumber";
import InputLinkYoutube from "./inputLinkYoutube";

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
	tag: "",
	tags: "",
	new: "",
	contents: "",
	musicId: "",
};

const resultDataInit = {
	beforeData: {},
	newData: {},
};

const WriteForm = ({ insertType }) => {
	const dispatch = useDispatch();
	const {
		insertWriteCall,
		insertWriteType,
		insertMusicDone,
		insertMusicResult,
		insertMusicError,
		musicInfoDone,
		musicInfo,
	} = useSelector((state) => state.music);
	const [insertForm, setInsertForm] = useState(formInit);
	const [resultData, setResultData] = useState(resultDataInit);
	//작성 타입 폼 설정
	useEffect(() => {
		if (insertType !== undefined) {
			let settingForm = {};
			switch (insertType) {
				case "NEW":
					settingForm.new = "Y";
					break;
				case "MODIFY":
					settingForm.new = "N";
					if (musicInfoDone) {
						const Musicdata = musicInfo.resultData;
						settingForm.musicId = Musicdata.id;
						settingForm.categoryId = Musicdata.CategoryId;
						if (Musicdata.Category !== null) {
							settingForm.categoryName = Musicdata.Category.name;
						}
						settingForm.singerId = Musicdata.SingerId;
						if (Musicdata.Singer !== null) {
							settingForm.singerName = Musicdata.Singer.name;
							settingForm.singerEName = Musicdata.Singer.e_name;
							settingForm.singerJName = Musicdata.Singer.j_name;
						}
						settingForm.title = Musicdata.title;
						settingForm.keumyong = Musicdata.keumyong;
						settingForm.taejin = Musicdata.taejin;
						if (Musicdata.Links.length > 0) {
							settingForm.link = Musicdata.Links.map((item) => item.src).join(
								", ",
							);
						}

						if (Musicdata.Tags.length > 0) {
							settingForm.tags = Musicdata.Tags.map(
								(item) => "#" + item.name,
							).join("");
						}
					}
					break;
				default:
					break;
			}
			setInsertForm({
				...insertForm,
				...settingForm,
			});
			setResultData(resultDataInit);
		}
	}, [insertType, musicInfoDone]);

	//요청 프로세스1  : 요청 버튼 클릭하면 요청API 호출
	useEffect(() => {
		if (insertWriteCall && insertWriteType !== null) {
			//정규식 체크
			const result = board.ValidationInsertBoard(insertType, insertForm);
			if (result) {
				console.log("insertForm", insertForm);
				console.log("insertType", insertType);
				dispatch({
					type: INSERT_BOARD_REQUEST,
					data: {
						form: insertForm,
						insertType,
					},
				});
			} else {
				dispatch(handleInsertReset());
			}
		}
	}, [insertWriteCall]);

	//요청 프로세스2 : 요청 결과 받은 후 요청 버튼 리셋
	useEffect(() => {
		if (insertMusicDone || insertMusicError) {
			dispatch(handleInsertReset());
			if (insertMusicResult !== null) {
				setResultData({
					beforeData: !Validation.isEmptyObject(insertMusicResult.beforeData)
						? insertMusicResult.beforeData
						: {},
					newData: !Validation.isEmptyObject(insertMusicResult.newData)
						? insertMusicResult.newData
						: {},
				});
			} else {
				setResultData(resultDataInit);
			}
		}
	}, [insertMusicDone, insertMusicError]);

	//태그 추가
	const handleAddTag = useCallback(
		(e) => {
			if (
				e.type == "click" ||
				(e.code == "Comma" && e.type == "keyup") ||
				(e.code == "Enter" && e.type == "keyup")
			) {
				if (insertForm.tag !== "") {
					const beforeTags = insertForm.tags;
					const updateTag = `#${insertForm.tag}`;
					const tags = beforeTags + updateTag;
					setInsertForm((prev) => ({
						...prev,
						tag: "",
						tags,
					}));
				}
			}
		},
		[insertForm.tag, insertForm.tags],
	);

	//태그 삭제
	const handleRemoveTag = useCallback(
		(tag) => {
			const tags = insertForm.tags.replace(new RegExp(`#${tag}`, "g"), "");
			setInsertForm((prev) => ({
				...prev,
				tags,
			}));
		},
		[insertForm.tags],
	);

	//작성
	const handleInput = useCallback((e) => {
		const { name, value, type, checked } = e.target;
		let newValue = type === "checkbox" ? checked : value;

		switch (name) {
			case "keumyong":
			case "taejin":
				newValue = Validation.inputOnlyNum(newValue);
				break;
			case "tag":
				newValue = Validation.replaceTagsText(newValue);

				break;
			default:
				break;
		}
		setInsertForm((prev) => ({
			...prev,
			[name]: newValue,
		}));
	}, []);

	return (
		<section>
			<Top insertType={insertType} />
			<SearchCategory insertForm={insertForm} onChangeForm={setInsertForm} />
			<SearchSinger insertForm={insertForm} onChangeForm={setInsertForm} />
			<input
				type="text"
				name="title"
				placeholder="노래 제목"
				value={insertForm.title}
				onChange={handleInput}
			/>
			<InputSingNumber insertForm={insertForm} handleInput={handleInput} />

			<InputLinkYoutube insertForm={insertForm} onChangeForm={setInsertForm} />

			<InputTagsForm
				insertForm={insertForm}
				handleInput={handleInput}
				handleRemoveTag={handleRemoveTag}
				handleAddTag={handleAddTag}
			/>
			<textarea
				name="contents"
				maxLength={150}
				value={insertForm.contents}
				placeholder="건의하고 싶은 사항이나, 문의 등..."
				onChange={handleInput}
			></textarea>
			{/* <Menu /> */}

			{/* 요청하고 난 뒤 데이터 확인 */}
			{insertMusicDone && insertMusicResult !== null && (
				<div>
					{!Validation.isEmptyObject(resultData.beforeData) && (
						<>
							{insertForm.new == "Y"
								? "이미 해당 번호의 노래가 있습니다."
								: "노래 수정 요청을 했습니다."}
							<div>
								기존 노래에요.
								<br />
								노래 제목 : {resultData.beforeData.title}
								<br />
								태진번호 : {resultData.beforeData.taejin}
								<br />
								금영번호 : {resultData.beforeData.keumyong}
								<br />
							</div>
							{/* {resultData.beforeData} */}
						</>
					)}
					<br />

					{!Validation.isEmptyObject(resultData.newData) && (
						<div>
							요청하신 데이터에용 :<br />
							노래 제목 : {resultData.newData.b_title} <br />
							요청 가수 : {resultData.newData.b_singer} <br />
							요청 가수 영문명 : {resultData.newData.b_e_singer}
							<br />
							요청 가수 일본어명 : {resultData.newData.b_j_singer}
							<br />
							금영번호 : {resultData.newData.b_keumyong} <br />
							태진번호 : {resultData.newData.b_taejin} <br />
							카테고리 : {resultData.newData.b_category} <br />
							요청 태그 : {resultData.newData.b_tags} <br />
							요청 유튜브 링크 : {resultData.newData.b_link}
							{!Validation.isEmpty(resultData.newData.b_link) &&
								resultData.newData.b_link.split(",").map((item, idx) => (
									<>
										<div
											key={idx}
											className="link-lists"
											dangerouslySetInnerHTML={{
												__html: youtubeParser(item),
											}}
										></div>
									</>
								))}
						</div>
					)}
				</div>
			)}
		</section>
	);
};

export default WriteForm;
