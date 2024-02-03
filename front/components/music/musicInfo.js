import React from "react";
import { youtubeParser } from "../../func/board";
import moment from "moment";
import Link from "next/link";

const MusicInfo = ({ music }) => {
	return (
		<div className="detail-con">
			<strong className="title">
				<em>{music.title}</em>
			</strong>
			<div className="form-wrap">
				<div className="form-viewer">
					<ul>
						<li>
							<em>카테고리</em>
							<em>{music.Category?.name}</em>
						</li>
						<li>
							<em>금영</em>
							<em className="num">{music.keumyong}</em>
						</li>
						<li>
							<em>태진</em>
							<em className="num"> {music.taejin}</em>
						</li>
						<li>
							<em>연관 태그</em>
							<em className="tags-items">
								{music.Tags?.map((tag, idx) => (
									<Link href={`/search/${tag.name}`} key={idx}>
										#{tag.name}
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
							<em>{music.Singer?.name}</em>
						</li>
						<li>
							<em>영어</em>
							<em>{music.Singer?.e_name}</em>
						</li>
						<li>
							<em>일본어</em>
							<em>{music.Singer?.j_name}</em>
						</li>
					</ul>
				</div>
			</div>

			<p className="last-update">
				<em>마지막 업데이트</em>
				<span>
					{moment(new Date(music.updatedAt)).format("YYYY/MM/DD HH:mm:ss")}
				</span>
			</p>
			{music.Links?.length > 0 && (
				<div className="links-wrap">
					{music.Links?.map((link, idx) => (
						<div
							key={idx}
							className="link-item"
							dangerouslySetInnerHTML={{
								__html: youtubeParser(link.src, 100, null, "persent"),
							}}
						></div>
					))}
				</div>
			)}
		</div>
	);
};

export default MusicInfo;
