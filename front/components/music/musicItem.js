import Link from "next/link";
import React from "react";
import { Validation } from "../../func/common";
import { useRouter } from "next/router";

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
		linkList,
	} = music;

	const handleMusicInfo = () => {
		router.push(`/music/${id}`);
	};
	const handleMusicModify = (id) => {
		router.push(`/music/modify?id=${id}`);
	};
	return (
		<div style={{ height: 500 }}>
			아이디 : {id}
			<br />
			카테고리 : {Category !== null ? Category.name : "-"}
			<br />
			제목 : {title}
			<br />
			가수 :{" "}
			{Singer !== null ? (
				<>
					{Singer.name} |{Singer.e_name} |{Singer.j_name}
				</>
			) : (
				"-"
			)}
			<br />
			금영 : {keumyong}
			<br />
			태진 : {taejin}
			<br />
			{Tags !== undefined && Tags.length > 0 && (
				<>
					{Tags.map(
						(tag) =>
							!Validation.isEmpty(tag) && (
								<Link href={`/search/${tag.name}`} key={tag.id}>
									#{tag.name}
								</Link>
							),
					)}
					<br />
				</>
			)}
			{linkList !== undefined &&
				linkList.length > 0 &&
				linkList.map((link, idx) => (
					<Link key={link.id} href={link.src} target="_blank">
						유튜브 영상{idx + 1}
					</Link>
				))}
			<br />
			<button onClick={() => handleMusicInfo()}>상세보기</button>
			<button onClick={() => handleMusicModify(id)}>수정요청</button>
		</div>
	);
};

export default MusicItem;
