import React, { useCallback, useEffect, useState } from "react";
import { Validation } from "../../func/common";
import { SearchWriteStyle } from "../../style/ContentStyle";

const InputTagsForm = ({
    insertForm,
    handleInput,
    handleRemoveTag,
    handleAddTag,
}) => {
    return (
        <SearchWriteStyle $type="tag">
            <div className="form-input">
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
            </div>
            <div className="selected-area">
                {insertForm.tags.length > 0 &&
                    insertForm.tags
                        .split("#")
                        .filter((tagTxt) => tagTxt.trim() !== "")
                        .map((tagTxt) => (
                            <span key={tagTxt} className="selected-tag">
                                #{tagTxt}
                                <button
                                    onClick={() => handleRemoveTag(tagTxt)}
                                    title="삭제"
                                >
                                    x
                                </button>
                            </span>
                        ))}
            </div>
        </SearchWriteStyle>
    );
};

export default InputTagsForm;
