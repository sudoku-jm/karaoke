import React from "react";
import { SearchWriteStyle } from "../../style/ContentStyle";

const InputTitle = ({ insertForm, handleInput }) => {
	return (
		<SearchWriteStyle $type="title">
			<div className="form-input">
				<input
					type="text"
					name="title"
					placeholder="노래 제목"
					value={insertForm.title}
					onChange={handleInput}
				/>
			</div>
		</SearchWriteStyle>
	);
};

export default InputTitle;
