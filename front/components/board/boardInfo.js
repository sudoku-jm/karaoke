import React from "react";
import moment from "moment";
import Link from "next/link";
import MusicSlider from "../form/musicSlider";

const BoardInfo = ({ music }) => {
	return (
		<div className="detail-con">
			<div className="form-wrap">
				<div className="form-viewer">
					<ul>
						<li>
							<em>요청타입</em>
							<em>{music.new == "Y" ? "신규요청" : "수정요청"}</em>
						</li>
						<li>
							<em>카테고리</em>
							<em>{music.Category?.name}</em>
						</li>
						<li>
							<em>제목</em>
							<em>{music.b_title}</em>
						</li>
						<li>
							<em>금영</em>
							<em className="num">{music.b_keumyong}</em>
						</li>
						<li>
							<em>태진</em>
							<em className="num"> {music.b_taejin}</em>
						</li>
						<li>
							<em>연관 태그</em>
							<em className="tags-items">
								{music.b_tags
									.split("#")
									.filter((tagTxt) => tagTxt.trim() !== "")
									.map((tagTxt, idx) => (
										<Link href={`/search/${tagTxt}`} key={idx}>
											#{tagTxt}
										</Link>
									))}
							</em>
						</li>
					</ul>
				</div>
			</div>
			<div className="form-wrap">
				<div className="form-viewer">
					<p>가수</p>
					<ul>
						<li>
							<em>한국어</em>
							<em>{music.b_singer}</em>
						</li>
						<li>
							<em>영어</em>
							<em>{music.b_e_singer}</em>
						</li>
						<li>
							<em>일본어</em>
							<em>{music.b_j_singer}</em>
						</li>
					</ul>
				</div>
			</div>
			<div className="form-wrap">
				<div className="form-viewer">{music.b_contents}</div>
			</div>

			<p className="last-update">
				<em>요청일</em>
				<span>
					{moment(new Date(music.updatedAt)).format("YYYY/MM/DD HH:mm:ss")}
				</span>
			</p>

			<div className="links-wrap">
				<MusicSlider
					listType="BOARD"
					musicList={music.b_link.split(",")}
					musicInfo={{ width: 100, height: null, unit: "persent" }}
				/>
			</div>
		</div>
	);
};

export default BoardInfo;
