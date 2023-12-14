import { Validaion } from "./common";

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
            Validaion.isEmpty(data.categoryId) &&
            Validaion.isEmpty(data.categoryName)
        ) {
            alert("카테고리명은 필수입니다.");
            return false;
        }
        if (
            Validaion.isEmpty(data.singerId) &&
            Validaion.isEmpty(data.singerName)
        ) {
            alert("가수명은 필수입니다.");
            return false;
        }
        if (Validaion.isEmpty(data.title)) {
            alert("노래 제목을 입력해주세요.");
            return false;
        }
        if (
            Validaion.isEmpty(data.keumyong) &&
            Validaion.isEmpty(data.taejin)
        ) {
            alert("노래방 번호는 필수입니다.");
            return false;
        }
        if (
            Validaion.onlyNumber(data.keumyong) ||
            Validaion.onlyNumber(data.taejin)
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

export default board;
