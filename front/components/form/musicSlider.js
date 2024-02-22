import React from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { youtubeParser } from "../../func/board";

const MusicSlider = ({ listType, musicList, musicInfo }) => {
	return (
		<Swiper
			pagination={{
				type: "progressbar",
			}}
			navigation={true}
			modules={[Pagination, Navigation]}
		>
			{musicList?.map((link, idx) => (
				<SwiperSlide key={idx}>
					<div
						className="link-item"
						dangerouslySetInnerHTML={{
							__html: youtubeParser(
								listType == "BOARD" ? link : link.src,
								musicInfo.width,
								musicInfo.height,
								musicInfo.unit,
							),
						}}
					></div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default MusicSlider;
