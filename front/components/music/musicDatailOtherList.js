import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MusicDetailOtherList = ({ dataType, dataList }) => {
	const router = useRouter();
	const handleGoDetail = useCallback(
		(item) => {
			//schTxt 세션스토리지 저장 확인하고 없으면 타이틀로 넣기
			router.push(`/music/${item.id}?schTxt=${item.title}&title=${item.title}`);
		},
		[dataType],
	);
	return (
		<div className="other-items">
			<Swiper slidesPerView={"auto"} spaceBetween={0}>
				{dataList?.map((item) => (
					<SwiperSlide key={item.id}>
						<div
							className="other-item cursor-p"
							onClick={() => handleGoDetail(item)}
						>
							<strong>{item.title}</strong>
							<div className="singer-item">
								{item.Singer?.name !== "" && <em>{item.Singer?.name}</em>}
								{item.Singer?.e_name !== "" && <em>{item.Singer?.e_name}</em>}
								{item.Singer?.j_name !== "" && <em>{item.Singer?.j_name}</em>}
							</div>
							<div className="num-items">
								<dl>
									<dt>금영</dt>
									<dd>{item.keumyong !== "" ? item.keumyong : "-"}</dd>
								</dl>
								<dl>
									<dt>태진</dt>
									<dd>{item.taejin !== "" ? item.taejin : "-"}</dd>
								</dl>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default MusicDetailOtherList;
