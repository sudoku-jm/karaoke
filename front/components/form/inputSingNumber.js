import React, { useCallback, useEffect, useState } from "react";
import { Validation } from "../../func/common";

const InputSingNumber = ({ onChangeForm }) => {
    const [form, setForm] = useState({
        keumyong: "",
        taejin: "",
    });

    useEffect(() => {
        onChangeForm((prev) => ({
            ...prev,
            keumyong: form.keumyong,
            taejin: form.taejin,
        }));
    }, [form]);

    //작성
    const handleInput = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        switch (name) {
            case "keumyong":
            case "taejin":
                newValue = Validation.inputOnlyNum(newValue);
                break;
            default:
                break;
        }
        setForm((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    }, []);

    return (
        <>
            <input
                type="text"
                name="keumyong"
                value={form.keumyong}
                placeholder="금영번호"
                maxLength={8}
                onChange={handleInput}
            />
            <input
                type="text"
                name="taejin"
                value={form.taejin}
                placeholder="태진번호"
                maxLength={8}
                onChange={handleInput}
            />
        </>
    );
};

export default InputSingNumber;
