import React, { useCallback, useEffect, useState } from "react";
import { Validation } from "../../func/common";

const InputTagsForm = ({ onChangeForm }) => {
	const [form, setForm] = useState({
		tag: "",
		tags: "",
	});

	useEffect(() => {
		onChangeForm((prev) => ({
			...prev,
			tag: form.tag,
			tags: form.tags,
		}));
	}, [form]);

	//태그 추가
	const handleAddTag = useCallback(
		(e) => {
			if (
				e.type == "click" ||
				(e.code == "Comma" && e.type == "keyup") ||
				(e.code == "Enter" && e.type == "keyup")
			) {
				if (form.tag !== "") {
					const beforeTags = form.tags;
					const updateTag = `#${form.tag}`;
					const tags = beforeTags + updateTag;
					setForm((prev) => ({
						...prev,
						tag: "",
						tags,
					}));
				}
			}
		},
		[form.tag, form.tags],
	);

	//태그 삭제
	const handleRemoveTag = useCallback(
		(tag) => {
			const tags = form.tags.replace(new RegExp(`#${tag}`, "g"), "");
			setForm((prev) => ({
				...prev,
				tags,
			}));
		},
		[form.tags],
	);

	//작성
	const handleInput = useCallback((e) => {
		const { name, value, type, checked } = e.target;
		let newValue = type === "checkbox" ? checked : value;

		switch (name) {
			case "tag":
				newValue = Validation.replaceTagsText(newValue);

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
				name="tag"
				value={form.tag}
				placeholder="추가할 태그명"
				maxLength={20}
				onChange={handleInput}
				onKeyUp={handleAddTag}
			/>
			<button onClick={handleAddTag}>태그추가</button>
			<div>
				{form.tags.length > 0 &&
					form.tags
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
