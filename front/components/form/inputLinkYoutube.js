import React, { useCallback, useEffect, useState } from "react";
import { Validation } from "../../func/common";
import useDebouncedValidation from "../../hooks/useDebouncedValidation";
import { youtubeParser } from "../../func/board";
import { SearchWriteStyle } from "../../style/ContentStyle";

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
				break;
			default:
				break;
		}
		setForm((prev) => ({
			...prev,
			[name]: newValue,
		}));
	}, []);

	//작성란 지우기
	const handleDeleteInputLink = useCallback(() => {
		setForm((prev) => ({
			...prev,
			link: "",
		}));
	}, [form.link]);

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
			const result = insertForm.link
				.split(",")
				.filter((t) => t.trim() !== link.trim());

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
		<SearchWriteStyle $type="link">
			<div className="form-input">
				<input
					type="text"
					name="link"
					value={form.link}
					placeholder="유튜브 MR링크"
					onChange={handleInput}
				/>
			</div>

			{!Validation.isEmpty(form.link) && isTrueFalse && (
				<div className="form-link-btn">
					{youtubeParser(form.link) !== null && (
						<button onClick={() => handleAddLink()}>
							{insertForm.link.split(",").filter((t) => t.trim() !== "")
								.length > 0
								? " 링크 하나 더 추가"
								: "해당 링크 추가"}
						</button>
					)}
					<button onClick={() => handleDeleteInputLink()}>
						해당 링크 지우기
					</button>
				</div>
			)}

			{!Validation.isEmpty(form.link) && !isTrueFalse ? (
				<div className="user-write-area">
					<p>{form.link}는 유튜브 링크가 아닙니다</p>
				</div>
			) : !Validation.isEmpty(form.link) && isTrueFalse ? (
				<>
					{!sameLinks && youtubeParser(form.link) !== null ? (
						<div className="user-write-area">
							<div
								dangerouslySetInnerHTML={{
									__html: youtubeParser(form.link),
								}}
							></div>
						</div>
					) : youtubeParser(form.link) == null ? (
						<p>{form.link}는 유튜브 영상 링크가 아닙니다.</p>
					) : (
						<div className="user-write-area">
							<p>이미 영상에 추가했습니다</p>
						</div>
					)}
				</>
			) : (
				""
			)}

			{insertForm.link.split(",").filter((t) => t.trim() !== "").length > 0 && (
				<div className="search-result-list">
					<label>추가 한 영상 리스트</label>
					{!Validation.isEmpty(insertForm.link) && (
						<div className="links-added">
							{insertForm.link.split(",").map((item, idx) => (
								<figure>
									<div
										key={idx}
										className="link-item"
										dangerouslySetInnerHTML={{
											__html: youtubeParser(item, 200),
										}}
									></div>
									<button onClick={() => handleRemoveLink(item)}>삭제</button>
								</figure>
							))}
						</div>
					)}
				</div>
			)}
		</SearchWriteStyle>
	);
};

export default InputLinkYoutube;
// OKBMpr_CSuw
