const Validaion = {
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
};

export { Validaion };
