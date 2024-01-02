import React, { useCallback, useEffect, useState } from "react";
import { Validation } from "../../func/common";
import useDebouncedValidation from "../../hooks/useDebouncedValidation";
import { youtubeParser } from "../../func/board";

const InputLinkYoutube = ({ insertForm, onChangeForm }) => {
	const [form, setForm] = useState({
		link: "",
		links: "",
	});
	const [isTrueFalse, setIsTrueFalse] = useState(false);
	const [sameLinks, setSameLinks] = useState(false);
	const [iframeYoutube, setIframeYoutube] = useState({
		isFirstLink: true,
	});

	useEffect(() => {
		handleDebouncedValidation(form.link, insertForm.link);
	}, [form, insertForm.link]);

	const handleDebouncedValidation = useDebouncedValidation(
		(value, insetFormLinks) => {
			if (!Validation.isEmpty(value)) {
				if (!Validation.isYoutubeLink(value)) {
					setIsTrueFalse(false);
				} else {
					setIsTrueFalse(true);
					const sameLink = insetFormLinks
						.split(",")
						.filter((t) => t.trim() === value.trim());
					setSameLinks(sameLink.length > 0 ? true : false);
				}

				setIframeYoutube({
					...iframeYoutube,
					isFirstLink: false,
				});
			} else if (!iframeYoutube.isFirstLink) {
				setIsTrueFalse(false);
			} else {
			}
		},
		500,
	);

	//작성
	const handleInput = useCallback((e) => {
		const { name, value, type, checked } = e.target;
		let newValue = type === "checkbox" ? checked : value;

		switch (name) {
			case "link":
				//Validation.isYoutubeLink(newValue);
				break;
			default:
				break;
		}
		setForm((prev) => ({
			...prev,
			[name]: newValue,
		}));
	}, []);

	//링크 추가
	const handleAddLink = useCallback(() => {
		const addLinks =
			insertForm.link !== "" ? insertForm.link + "," + form.link : form.link;

		const linksArray = addLinks.split(",");
		const uniqueLinksSet = new Set(linksArray);
		const uniqueLinksArray = Array.from(uniqueLinksSet);
		const textFromUniqueLinks = uniqueLinksArray.join(",");

		onChangeForm((prev) => ({
			...prev,
			link: textFromUniqueLinks,
		}));

		setForm((prev) => ({
			...prev,
			link: "",
			links: textFromUniqueLinks,
		}));
	}, [form.link]);

	//링크 삭제
	const handleRemoveLink = useCallback(
		(link) => {
			console.log("insertForm.link,", insertForm.link);
			console.log("link,", link);

			const result = insertForm.link
				.split(",")
				.filter((t) => t.trim() !== link.trim());

			console.log("result", result);

			const textFromUniqueLinks = result.join(",");

			onChangeForm((prev) => ({
				...prev,
				link: textFromUniqueLinks,
			}));

			setForm((prev) => ({
				...prev,
				links: textFromUniqueLinks,
			}));
		},
		[insertForm.link],
	);

	return (
		<>
			<input
				type="text"
				name="link"
				value={form.link}
				placeholder="유튜브 MR링크"
				onChange={handleInput}
			/>

			{!Validation.isEmpty(form.link) && isTrueFalse && (
				<button onClick={() => handleAddLink()}>
					{insertForm.link.split(",").filter((t) => t.trim() !== "").length > 0
						? " 링크 하나 더 추가"
						: "해당 링크 추가"}
				</button>
			)}

			{!Validation.isEmpty(form.link) && !isTrueFalse ? (
				<p>해당 링크는 유튜브 링크가 아닙니다</p>
			) : !Validation.isEmpty(form.link) && isTrueFalse ? (
				<>
					{!sameLinks ? (
						<div
							dangerouslySetInnerHTML={{
								__html: youtubeParser(form.link),
							}}
						></div>
					) : (
						"이미 영상에 추가했습니다"
					)}
				</>
			) : (
				""
			)}

			{insertForm.link.split(",").filter((t) => t.trim() !== "").length > 0 && (
				<h3>추가 된 영상 리스트</h3>
			)}
			{!Validation.isEmpty(insertForm.link) &&
				insertForm.link.split(",").map((item, idx) => (
					<>
						<div
							key={idx}
							className="link-lists"
							dangerouslySetInnerHTML={{
								__html: youtubeParser(item),
							}}
						></div>
						<button onClick={() => handleRemoveLink(item)}>삭제</button>
					</>
				))}
		</>
	);
};

export default InputLinkYoutube;
// OKBMpr_CSuw
