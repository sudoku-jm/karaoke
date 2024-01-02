import React from "react";

const InputSingNumber = ({ insertForm, handleInput }) => {
	return (
		<>
			<input
				type="text"
				name="keumyong"
				value={insertForm.keumyong}
				placeholder="금영번호"
				maxLength={8}
				onChange={handleInput}
			/>
			<input
				type="text"
				name="taejin"
				value={insertForm.taejin}
				placeholder="태진번호"
				maxLength={8}
				onChange={handleInput}
			/>
		</>
	);
};

export default InputSingNumber;
