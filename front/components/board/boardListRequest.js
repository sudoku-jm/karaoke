import React, { useCallback } from "react";
import { youtubeParser } from "../../func/board";
import { Validation } from "../../func/common";
import Link from "next/link";
import { useRouter } from "next/router";

const BoardListRequest = ({
	board,
	pageType,
	handleInsertCategory,
	handleInsertSinger,
	handleInsertMusic,
}) => {
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

	const router = useRouter();
	const handleGoDetail = useCallback(() => {
		router.push(`/board/${id}`);
	}, []);

	return (
		<li
			key={id}
			className={`${board.new == "Y" ? "cursor-p" : "modify cursor-p"}`}
			onClick={() => handleGoDetail()}
		>
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
					{Validation.isEmpty(b_link) ? "🎬" : ""}
				</div>

				<div className="content-items">
					{b_contents.length > 20
						? `${b_contents.slice(0, 20)}...`
						: b_contents}
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
