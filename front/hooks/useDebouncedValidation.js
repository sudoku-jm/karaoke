import React, { useRef } from "react";
import { debounce } from "../func/common";

const useDebouncedValidation = (validationFunction, delay) => {
	const debouncedValidation = useRef(
		debounce(validationFunction, delay),
	).current;

	return debouncedValidation;
};

export default useDebouncedValidation;
