const removeSpecialCharacters = (inputString) => {
    // 특수문자를 제거하는 정규 표현식
    const regex = /[^a-zA-Z0-9가-힣\s]/g;

    // 정규 표현식을 사용하여 특수문자 제거
    return inputString.replace(regex, "");
};

//검색 조건
const includesSearch = (writeStr, originStr) => {
    const searchTerm = writeStr.replace(/\s/g, "");
    const originName = originStr.replace(/\s/g, "");

    // 짧은 길이를 기준으로 부분 일치 확인
    const minLength = Math.min(searchTerm.length, originName.length);
    const partialMatch =
        searchTerm.slice(0, minLength) === originName.slice(0, minLength);

    // 부분 일치 확인
    const includesSearchQuery1 = originName.includes(searchTerm);
    const includesSearchQuery2 = searchTerm.includes(originName);

    const includesTxt = includesSearchQuery1 || includesSearchQuery2;

    return {
        partialMatch,
        includesTxt,
    };
};

module.exports = { removeSpecialCharacters, includesSearch };
