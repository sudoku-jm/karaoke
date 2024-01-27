import Link from "next/link";
import React, { useState } from "react";
import { Validation } from "../../func/common";
import { useRouter } from "next/router";
import { SearchListItemStyle } from "../../style/ContentStyle";

const MusicItem = ({ music, schTxt }) => {
	const router = useRouter();
	const {
		id,
		Category,
		CategoryId,
		HitId,
		Singer,
		Tags,
		keumyong,
		taejin,
		title,
		Links,
	} = music;

	const [visible, setVisible] = useState({
		sideArea: false,
	});

	const handleMusicInfo = () => {
		const txt = encodeURIComponent(schTxt);
		const tt = encodeURIComponent(title);
		const url = `/music/${id}?schTxt=${txt}&title=${tt}`;
		router.push(url);
	};
	const handleMusicModify = (id) => {
		const txt = encodeURIComponent(schTxt);
		const tt = encodeURIComponent(title);
		sessionStorage.setItem("musicId", id);
		sessionStorage.setItem("schTxt", txt);
		sessionStorage.setItem("musicTitle", tt);
		sessionStorage.setItem("isList", true);
		router.push(`/music/modify?id=${id}`);
	};
	const handleItemSideBtn = (e) => {
		setVisible((prev) => ({
			...prev,
			sideArea: !prev.sideArea,
		}));
	};
	return (
		<SearchListItemStyle>
			{/* 아이디 : {id} */}
			{Category !== null ? <i className="label-item">{Category.name}</i> : "-"}
			<div className="side-wrap">
				<button onClick={() => handleItemSideBtn()}>
					<span>⁝</span>
				</button>
				{visible.sideArea && (
					<div className="side-btn-wrap col2">
						<button onClick={() => handleMusicModify(id)}>수정요청</button>
					</div>
				)}
			</div>
			<div className="cursor-p" onClick={() => handleMusicInfo()}>
				<strong className="title">{title}</strong>
				{Singer !== null ? (
					<div className="singer-item">
						{Singer.name !== "" && <em>{Singer.name}</em>}
						{Singer.e_name !== "" && <em>{Singer.e_name}</em>}
						{Singer.j_name !== "" && <em>{Singer.j_name}</em>}
					</div>
				) : (
					"-"
				)}
			</div>
			{Tags !== undefined && Tags.length > 0 && (
				<div className="tags-items">
					{Tags.map(
						(tag, idx) =>
							!Validation.isEmpty(tag) && (
								<Link href={`/search/${tag.name}`} key={idx}>
									#{tag.name}
								</Link>
							),
					)}
				</div>
			)}
			<div className="num-items">
				<dl>
					<dt>금영</dt>
					<dd>{keumyong !== "" ? keumyong : "-"}</dd>
				</dl>
				<dl>
					<dt>태진</dt>
					<dd>{taejin !== "" ? taejin : "-"}</dd>
				</dl>
			</div>
		</SearchListItemStyle>
	);
};

export default MusicItem;
