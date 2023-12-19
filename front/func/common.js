const Validation = {
    isEmptyObject: (obj) => {
        return Object.keys(obj).length === 0;
    },
    isEmpty: (targetStr) => {
        if (
            targetStr === undefined ||
            targetStr.toString().replace(/\s/g, "") === ""
        ) {
            return true;
        }
        return false;
    },
    onlyNumber: (str) => {
        return /^\d+$/.test(str);
    },
    inputOnlyNum: (str) => {
        // return str.replaceAll(/[^0-9]/gi, "");
        return str.replace(/\D/g, "");
    },
    replaceTagsText: (str) => {
        //숫자, 영어, 일본어, 한국어 허용
        //특수문자 x
        let result = str.replace(
            /[^\w\dㄱ-ㅎㅏ-ㅣ가-힣ぁ-んァ-ン一-龯ー]/g,
            ""
        );
        if (result.includes(",")) {
            result = result.replace(/,/g, "#"); // 쉼표 사용 시 #으로 대체
        }
        return result;
    },
    isYoutubeLink: (str) => {
        const regExp =
            /(http:|https:)?(\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/)?([a-zA-Z0-9_-]+)/g;

        if (regExp.test(str)) {
            return true;
        }

        return false;
    },
};

//디바운싱
const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
export { Validation, debounce };
