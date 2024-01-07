import React from "react";
import { SearchWriteStyle } from "../../style/ContentStyle";

const InputContents = ({ insertForm, handleInput }) => {
	return (
		<SearchWriteStyle $type="contents">
			<div className="form-input">
				<textarea
					name="contents"
					maxLength={150}
					value={insertForm.contents}
					placeholder="건의하고 싶은 사항이나, 문의 등..."
					onChange={handleInput}
				></textarea>
			</div>
		</SearchWriteStyle>
	);
};

export default InputContents;
