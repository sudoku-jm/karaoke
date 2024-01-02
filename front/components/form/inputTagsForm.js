import React, { useCallback, useEffect, useState } from "react";
import { Validation } from "../../func/common";

const InputTagsForm = ({
	insertForm,
	handleInput,
	handleRemoveTag,
	handleAddTag,
}) => {
	return (
		<>
			<input
				type="text"
				name="tag"
				value={insertForm.tag}
				placeholder="추가할 태그명"
				maxLength={20}
				onChange={handleInput}
				onKeyUp={handleAddTag}
			/>
			<button onClick={handleAddTag}>태그추가</button>
			<div>
				{insertForm.tags.length > 0 &&
					insertForm.tags
						.split("#")
						.filter((tagTxt) => tagTxt.trim() !== "")
						.map((tagTxt) => (
							<span key={tagTxt}>
								#{tagTxt}
								<button onClick={() => handleRemoveTag(tagTxt)}>삭제</button>
							</span>
						))}
			</div>
		</>
	);
};

export default InputTagsForm;
