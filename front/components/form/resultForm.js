import React, { useEffect, useState } from "react";
import { handleInsertReset } from "../../reducers/music";
import { useDispatch, useSelector } from "react-redux";
import { PopupInsertResultStyle } from "../../style/ContentStyle";
import { Validation } from "../../func/common";
import { youtubeParser } from "../../func/board";
import Link from "next/link";
import MusicSlider from "./musicSlider";

const resultDataInit = {
	beforeData: {},
	newData: {},
};

const ResultForm = ({ insertType }) => {
	const dispatch = useDispatch();
	const {
		insertMusicDone,
		insertMusicResult,
		insertMusicError,
		musicInfoDone,
	} = useSelector((state) => state.music);
	const [resultData, setResultData] = useState(resultDataInit);

	//작성 타입 폼 페이지 초기화
	useEffect(() => {
		if (insertType !== undefined) {
			setResultData(resultDataInit);
		}
	}, [insertType, musicInfoDone]);

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

	return (
		<>
			{/* 요청하고 난 뒤 데이터 확인 */}
			{insertMusicDone && insertMusicResult !== null && (
				<PopupInsertResultStyle>
					<div className="form-wrap">
						<>
							<h3>요청 감사합니다.</h3>
							<p>빠른 시일내 반영 할 수 있도록 하겠습니다!</p>
							{!Validation.isEmptyObject(resultData.beforeData) && (
								<>
									{insertType == "NEW" ? (
										<p>이미 해당 번호의 노래가 있습니다.</p>
									) : (
										<p>노래 수정 요청을 했습니다.</p>
									)}

									<div className="form-viewer">
										<p>해당 번호의 기존 노래 정보입니다.</p>
										<ul>
											<li>
												<em>노래 제목</em>
												<em>{resultData.beforeData.title}</em>
											</li>
											<li>
												<em>태진 번호</em>
												<em>{resultData.beforeData.taejin}</em>
											</li>
											<li>
												<em>금영 번호</em>
												<em>{resultData.beforeData.keumyong}</em>
											</li>
										</ul>
									</div>
								</>
							)}
							<br />

							{!Validation.isEmptyObject(resultData.newData) && (
								<div className="form-viewer">
									<p>요청 하신 곡 정보 입니다</p>
									<ul>
										<li>
											<em>카테고리</em>
											<em>{resultData.newData.b_category}</em>
										</li>
										<li>
											<em>노래 제목</em>
											<em>{resultData.newData.b_title}</em>
										</li>
										<li>
											<em>요청 가수</em>
											<em>{resultData.newData.b_singer}</em>
										</li>
										<li>
											<em>요청 가수 영문명</em>
											<em>{resultData.newData.b_e_singer}</em>
										</li>

										<li>
											<em>요청 가수 일본어명</em>
											<em>{resultData.newData.b_j_singer}</em>
										</li>
										<li>
											<em>금영 번호</em>
											<em>{resultData.newData.b_keumyong}</em>
										</li>
										<li>
											<em>태진 번호</em>
											<em>{resultData.newData.b_taejin}</em>
										</li>

										<li>
											<em>요청 태그</em>
											<em>{resultData.newData.b_tags}</em>
										</li>
										<li>
											<em>코멘트</em>
											<em>{resultData.newData.b_contents}</em>
										</li>
									</ul>
									<div className="links">
										<em>요청 유튜브 링크</em>

										{!Validation.isEmpty(resultData.newData.b_link) ? (
											<MusicSlider
												listType="BOARD"
												musicList={resultData.newData.b_link.split(",")}
												musicInfo={{
													width: 100,
													height: null,
													unit: "persent",
												}}
											/>
										) : (
											""
										)}
									</div>
								</div>
							)}
						</>
						<div className="btn-wrap">
							<Link href="/board" title="페이지이동" className="btn-link">
								곡 신청 리스트 구경하기
							</Link>
						</div>
					</div>
				</PopupInsertResultStyle>
			)}
		</>
	);
};

export default ResultForm;
