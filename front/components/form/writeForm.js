import React, { useCallback, useEffect, useState } from "react";
import Menu from "../menu/Menu";
import Top from "./top";
import { useDispatch, useSelector } from "react-redux";
import { INSERT_BOARD_REQUEST, handleInsertReset } from "../../reducers/music";
import SearchCategory from "./searchCategory";
import { board } from "../../func/board";
import SearchSinger from "./searchSinger";
import { Validation } from "../../func/common";
import InputTagsForm from "./inputTagsForm";
import InputSingNumber from "./inputSingNumber";
import InputLinkYoutube from "./inputLinkYoutube";
import { PageWriteStyle } from "../../style/ContentStyle";
import InputTitle from "./inputTitle";
import InputContents from "./inputContents";
import ResultForm from "./resultForm";

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

const WriteForm = ({ insertType }) => {
	const dispatch = useDispatch();
	const {
		insertWriteCall,
		insertWriteType,
		musicInfoDone,
		musicInfo,
		insertMusicDone,
	} = useSelector((state) => state.music);
	const [insertForm, setInsertForm] = useState(formInit);
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

	//태그 추가
	const handleAddTag = useCallback(
		(e) => {
			if (e.type == "click" || (e.code == "Comma" && e.type == "keyup")) {
				const tagsLength = insertForm.tags
					.split("#")
					.filter((tagTxt) => tagTxt.trim() !== "").length;
				if (tagsLength + 1 > 10) {
					alert("태그의 수는 최대 10개까지 가능합니다.");
					return false;
				}
				if (insertForm.tag !== "") {
					const beforeTags = insertForm.tags;
					// let updateTag = `#${insertForm.tag}`;
					let updateTag = insertForm.tag.replace(/,/g, "").replace(/、/g, "");
					updateTag = `#${updateTag}`;
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
			// case "tag":
			// 	newValue = Validation.replaceTagsText(newValue);

			// 	break;
			default:
				break;
		}
		setInsertForm((prev) => ({
			...prev,
			[name]: newValue,
		}));
	}, []);

	return (
		<PageWriteStyle>
			<Top insertType={insertType} resultState={insertMusicDone} />
			<article className="form-wrap">
				<SearchCategory insertForm={insertForm} onChangeForm={setInsertForm} />
				<SearchSinger insertForm={insertForm} onChangeForm={setInsertForm} />
				<InputTitle insertForm={insertForm} handleInput={handleInput} />
				<InputSingNumber insertForm={insertForm} handleInput={handleInput} />

				<InputLinkYoutube
					insertForm={insertForm}
					onChangeForm={setInsertForm}
				/>

				<InputTagsForm
					insertForm={insertForm}
					handleInput={handleInput}
					handleRemoveTag={handleRemoveTag}
					handleAddTag={handleAddTag}
				/>

				<InputContents insertForm={insertForm} handleInput={handleInput} />

				{/* <Menu /> */}
			</article>

			<ResultForm insertType={insertType} />
		</PageWriteStyle>
	);
};

export default WriteForm;
