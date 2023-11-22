const wanakana = require("wanakana");

const removeSpecialCharacters = (inputString) => {
    // 특수문자를 제거하는 정규 표현식
    const regex = /[^a-zA-Z0-9가-힣ぁ-んーァ-ヶー一-龠\s]/g;

    // 정규 표현식을 사용하여 특수문자 제거
    return inputString.replace(regex, "");
};

//검색 조건
const includesSearch = (writeStr, originStr) => {
    const removeSpacesRegex = /[\s　]/g;

    console.log("writeStr", writeStr);
    console.log("originStr", originStr);

    const searchTerm = writeStr.replace(removeSpacesRegex, "").toLowerCase();
    const originName = originStr.replace(removeSpacesRegex, "").toLowerCase();

    //writeStr, originName이 비어있는 경우에 대한 처리 추가
    if (
        originName === null ||
        originName === "" ||
        writeStr === null ||
        writeStr === ""
    ) {
        return {
            partialMatch: false,
            includesTxt: false,
        };
    }

    // 짧은 길이를 기준으로 부분 일치 확인
    const minLength = Math.min(searchTerm.length, originName.length);
    const partialMatch =
        searchTerm.slice(0, minLength) === originName.slice(0, minLength);

    // 부분 일치 확인
    const includesSearchQuery1 = originName.includes(searchTerm);
    const includesSearchQuery2 = searchTerm.includes(originName);

    // 일본어인지 체크
    if (wanakana.isJapanese(writeStr)) {
        // 히라가나로 변환하여 비교
        const hiraganaSearchTerm = wanakana.toHiragana(searchTerm);
        const hiraganaOriginName = wanakana.toHiragana(originName);

        const hiraganaPartialMatch =
            hiraganaSearchTerm.slice(0, minLength) ===
            hiraganaOriginName.slice(0, minLength);

        const hiraganaIncludesSearchQuery1 =
            hiraganaOriginName.includes(hiraganaSearchTerm);
        const hiraganaIncludesSearchQuery2 =
            hiraganaSearchTerm.includes(hiraganaOriginName);

        return {
            partialMatch: hiraganaPartialMatch,
            includesTxt:
                hiraganaIncludesSearchQuery1 || hiraganaIncludesSearchQuery2,
        };
    }

    const includesTxt = includesSearchQuery1 || includesSearchQuery2;

    return {
        partialMatch,
        includesTxt,
    };
};

module.exports = { removeSpecialCharacters, includesSearch };
