import React from "react";
import { SearchWriteStyle } from "../../style/ContentStyle";

const InputSingNumber = ({ insertForm, handleInput }) => {
	return (
		<SearchWriteStyle $type="num">
			<div className="form-input">
				<input
					type="text"
					name="keumyong"
					value={insertForm.keumyong}
					placeholder="금영번호"
					maxLength={8}
					onChange={handleInput}
				/>
			</div>
			<div className="form-input">
				<input
					type="text"
					name="taejin"
					value={insertForm.taejin}
					placeholder="태진번호"
					maxLength={8}
					onChange={handleInput}
				/>
			</div>
		</SearchWriteStyle>
	);
};

export default InputSingNumber;
