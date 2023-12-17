import { Validation } from "./common";

const board = {
	ValidationInsertBoard: (type, data) => {
		//곡 추가|수정 요청 필수 값 체크.
		let result = false;
		switch (type) {
			case "NEW":
				result = board.ValidationInsertNewData(data);
				break;
			case "MODIFY":
				break;
			default:
				break;
		}

		return result;
	},
	ValidationInsertNewData: (data) => {
		console.log("ValidationInsertNewData", data);
		if (
			Validation.isEmpty(data.categoryId) &&
			Validation.isEmpty(data.categoryName)
		) {
			alert("카테고리명은 필수입니다.");
			return false;
		}
		if (
			Validation.isEmpty(data.singerId) &&
			Validation.isEmpty(data.singerName)
		) {
			alert("가수명은 필수입니다.");
			return false;
		}
		if (Validation.isEmpty(data.title)) {
			alert("노래 제목을 입력해주세요.");
			return false;
		}
		if (Validation.isEmpty(data.keumyong) && Validation.isEmpty(data.taejin)) {
			alert("노래방 번호는 필수입니다.");
			return false;
		}
		if (
			Validation.onlyNumber(data.keumyong) ||
			Validation.onlyNumber(data.taejin)
		) {
			alert("노래방 번호는 숫자만 입력가능.");
			return false;
		}
		return true;
	},
	ValidationInsertModifyData: (data) => {
		return true;
	},
};

const youtubeParser = (youtubeUrl) => {
	const getVideoIdFromShortUrl = (url) => {
		const urlObject = new URL(url);
		const pathSegments = urlObject.pathname.split("/");
		return pathSegments[1];
	};

	const getVideoIdFromWatchUrl = (url) => {
		const urlParams = new URLSearchParams(new URL(url).search);
		return urlParams.get("v");
	};
	const getVideoId = (url) => {
		if (url.includes("youtu.be")) {
			return getVideoIdFromShortUrl(url);
		} else if (url.includes("youtube.com/watch")) {
			return getVideoIdFromWatchUrl(url);
		} else {
			// 다른 URL 형태에 대한 처리, 예를 들어 오류 처리 또는 기본 동작 설정 등
			console.error("Unsupported YouTube URL format");
			return null;
		}
	};

	const container = `
    <div class="video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/#ID#" title="YouTube video player"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>`;

	return !Validation.isEmpty(youtubeUrl) && Validation.isYoutubeLink(youtubeUrl)
		? container.replace("#ID#", getVideoId(youtubeUrl))
		: youtubeUrl;
};

export { board, youtubeParser };
