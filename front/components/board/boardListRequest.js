import React, { useCallback, useEffect } from "react";
import { Validation } from "../../func/common";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
	INSERT_CATEGORY_REQUEST,
	INSERT_MUSIC_REQUEST,
	INSERT_SINGER_REQUEST,
	handleInsertCategoryReset,
	handleInsertMusicReset,
	handleInsertSingerReset,
} from "../../reducers/admin";

const BoardListRequest = ({ board, pageType }) => {
	const {
		id,
		b_title,
		Singer,
		SingerId,
		b_singer,
		b_e_singer,
		b_j_singer,
		Category,
		CategoryId,
		b_category,
		b_keumyong,
		b_taejin,
		b_tags,
		b_link,
		b_contents,
		MusicId,
	} = board;

	const {
		insertCategoryError,
		insertCategory,
		insertCategoryDone,
		insertSingerError,
		insertSinger,
		insertSingerDone,
		insertMusicError,
		insertMusic,
		insertMusicDone,
	} = useSelector((state) => state.admin);

	const router = useRouter();

	useEffect(() => {
		if (insertCategoryError) {
			alert(insertCategoryError.msg);
			dispatch(handleInsertCategoryReset());
		}
		if (insertSingerError) {
			alert(insertSingerError.msg);
			dispatch(handleInsertSingerReset());
		}
		if (insertMusicError) {
			alert(insertMusicError.msg);
			dispatch(handleInsertMusicReset());
		}
	}, [insertCategoryError, insertSingerError, insertMusicError]);

	useEffect(() => {
		if (insertCategoryDone) {
			alert("등록 완료 : " + insertCategory.name);
			dispatch(handleInsertCategoryReset());
		}
		if (insertSingerDone) {
			alert("등록 완료");
			dispatch(handleInsertSingerReset());
		}
		if (insertMusicDone) {
			alert("등록 완료");
			dispatch(handleInsertMusicReset());
		}
	}, [insertCategoryDone, insertSingerDone, insertMusicDone]);

	const handleGoDetail = useCallback(() => {
		router.push(`/board/${id}?pageType=${pageType}`);
	}, [pageType]);
	//카테고리 추가
	const handleInsertCategory = (id, cateName) => {
		dispatch({
			type: INSERT_CATEGORY_REQUEST,
			data: {
				boardId: !Validation.isEmpty(id) ? id : "",
				name: cateName,
			},
		});
	};

	//가수 추가
	const handleInsertSinger = (id, name, eName, jName) => {
		dispatch({
			type: INSERT_SINGER_REQUEST,
			data: {
				boardId: !Validation.isEmpty(id) ? id : "",
				name: name,
				e_name: eName,
				j_name: jName,
			},
		});
	};

	//음악 추가
	const handleInsertMusic = (board) => {
		const form = {
			categoryId: board.CategoryId,
			categoryName: board.Category?.name,
			singerId: board.SingerId,
			singerName: board.Singer?.name,
			singerEName: board.Singer?.e_name,
			singerJName: board.Singer?.j_name,
			title: board.b_title,
			keumyong: board.b_keumyong,
			taejin: board.b_taejin,
			link: board.b_link,
			contents: board.b_contents,
			tags: board.b_tags,
			new: board.new,
			musicId: board.MusicId, //아이디는 있을 수 있고, 없을 수 있다.
			boardId: board.id,
		};
		dispatch({
			type: INSERT_MUSIC_REQUEST,
			data: form,
		});
	};

	return (
		<li key={id} className={`${board.new == "Y" ? "" : "modify"}`}>
			<div className="cursor-p" onClick={() => handleGoDetail()}>
				<div className="top">
					<i className="label-item">
						{CategoryId !== null ? Category?.name : b_category}
					</i>
					<span className="request-type">
						{board.new == "Y" ? (
							MusicId == null ? (
								<em className="before">등록요청</em>
							) : (
								<em>등록완료</em>
							)
						) : (
							<em className="before">수정요청</em>
						)}
					</span>
				</div>
				<div className="con">
					<strong className="title">{b_title}</strong>

					{/* 가수명 */}
					<div className="singer-item">
						{SingerId !== null ? (
							<>
								{Singer.name !== "" && <em>{Singer.name}</em>}
								{Singer.e_name !== "" && <em>{Singer.e_name}</em>}
								{Singer.j_name !== "" && <em>{Singer.j_name}</em>}
							</>
						) : (
							<>
								{b_singer !== "" && <em>{b_singer}</em>}
								{b_e_singer !== "" && <em>{b_e_singer}</em>}
								{b_j_singer !== "" && <em>{b_j_singer}</em>}
							</>
						)}
					</div>

					{/* 번호 */}
					<div className="num-items">
						<dl>
							<dt>금영</dt>
							<dd>{Validation.isEmpty(b_keumyong) ? "-" : b_keumyong}</dd>
						</dl>
						<dl>
							<dt>태진</dt>
							<dd>{Validation.isEmpty(b_taejin) ? "-" : b_taejin}</dd>
						</dl>
					</div>

					{/* 태그명 */}
					<div className="tags-items">
						{b_tags
							.split("#")
							.filter((t) => t.trim() !== "")
							.map((tag) => (
								<span>#{tag}</span>
							))}
					</div>

					{/* 유튜브 링크 */}
					{/* <div className="link-itmes">
						{Validation.isEmpty(b_link)
							? "-"
							: b_link.split(",").map((item, idx) => (
									<>
										{<span
										key={idx}
										className="link-item"
										dangerouslySetInnerHTML={{
											__html: youtubeParser(item, 150, 100),
										}}
									></span> }
										<Link
											href={item}
											target="_blank"
											className="link"
											title="새창열림"
										>
											유튜브 링크 {idx + 1}
										</Link>
									</>
							))}
					</div> */}
					<div className="link-itmes">
						{!Validation.isEmpty(b_link) ? "🎬" : ""}
					</div>

					<div className="content-items">
						{b_contents.length > 20
							? `${b_contents.slice(0, 20)}...`
							: b_contents}
					</div>
				</div>
			</div>

			{/* 관리자만 보이는 영역 */}
			{pageType == "ADMIN" && (
				<div className="bottom btn-area">
					{CategoryId == null && (
						<span>
							<button onClick={() => handleInsertCategory(id, b_category)}>
								카테고리 추가
							</button>
						</span>
					)}
					{SingerId == null && (
						<span>
							<button
								onClick={() =>
									handleInsertSinger(id, b_singer, b_e_singer, b_j_singer)
								}
							>
								가수 추가
							</button>
						</span>
					)}

					{/* 음악추가 */}
					{board.new == "Y" && CategoryId !== null && SingerId !== null && (
						<button onClick={() => handleInsertMusic(board)}>음악추가</button>
					)}
				</div>
			)}
		</li>
	);
};

export default BoardListRequest;
