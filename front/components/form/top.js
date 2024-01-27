import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleInsert } from "../../reducers/music";
import { useRouter } from "next/router";
import { queryStringToObject } from "../../func/common";

const Top = ({ insertType, flag }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [form, setForm] = useState({
		pageTitle: "",
	});

	// top 제목 타입 설정
	useEffect(() => {
		if (insertType !== undefined && insertType !== "") {
			let title = "";
			switch (insertType) {
				case "NEW":
					title = "신곡 요청";
					break;
				case "MODIFY":
					title = "수정 요청";
					break;
				case "SEARCH":
					title = "검색 결과";
					break;

				case "MUSIC_DETAIL":
					title = queryStringToObject(location.search)?.title;
					break;

				default:
					break;
			}
			setForm({
				...form,
				pageTitle: title,
			});
		}
	}, [insertType, flag]);

	//요청
	const handleWirteClick = useCallback(() => {
		if (confirm("요청하시겠습니까?")) {
			dispatch(handleInsert(insertType));
		}
	}, [insertType]);

	//수정요청 페이지 이동
	const handleModifyLink = () => {
		router.push(`/music/modify?id=${router.query?.musicId}`);
	};

	//취소
	const handleCancelClick = useCallback(() => {
		//검색리스트로 돌아가기
		//수정하기 누를 때 해당 페이지 주소 로컬이나 세션스토리지에 저장.
		//돌아가기 누르면 삭제
		//해당 데이터가 없으면 메인으로 이동
		if (insertType == "MUSIC_DETAIL") {
			// 검색 페이지도 이동
			router.push(`/search/${queryStringToObject(location.search)?.schTxt}`);
		} else if (insertType == "MODIFY") {
			//곡 상세 페이지로 이동
			const schTxt = sessionStorage.getItem("schTxt");
			const musicId = sessionStorage.getItem("musicId");
			const title = sessionStorage.getItem("musicTitle");

			router.push(`/music/${musicId}?schTxt=${schTxt}&title=${title}`);
		} else {
			//메인으로 이동
			router.push("/");
		}
	}, [insertType]);
	return (
		<header>
			{(insertType == "SEARCH" || insertType == "MUSIC_DETAIL") && (
				<button onClick={handleCancelClick} className="prev">
					이전
				</button>
			)}
			{insertType == "MODIFY" && (
				<button onClick={handleCancelClick} className="prev">
					취소
				</button>
			)}

			<h2>{form.pageTitle}</h2>

			{(insertType == "MODIFY" || insertType == "NEW") && (
				<button onClick={handleWirteClick} className="insert">
					요청
				</button>
			)}

			{insertType == "MUSIC_DETAIL" && (
				<button onClick={handleModifyLink} className="right">
					수정요청
				</button>
			)}
		</header>
	);
};

export default Top;
