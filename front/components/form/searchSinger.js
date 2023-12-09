import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_SINGER_REQUEST } from "../../reducers/music";

const SearchSinger = ({ onChangeForm }) => {
	const dispatch = useDispatch();
	const { searchSingerLoading, searchSingerDone, searchSingerList } =
		useSelector((state) => state.music);
	const [form, setForm] = useState({
		singerName: "",
		singerEName: "",
		singerJName: "",
		singerList: [], //검색한 가수 리스트
		selectedSinger: {}, // 선택한 가수 데이터
	});
	const [visible, setVisible] = useState({
		searchSingerListVisible: false,
	});

	const getSinger = useCallback(
		(name) => {
			if (name == "") {
				setVisible({
					...visible,
					searchSingerListVisible: false,
				});
			}
			if (name !== "" && !searchSingerLoading) {
				dispatch({
					type: SEARCH_SINGER_REQUEST,
					data: {
						singerName: name,
					},
				});
			}
		},
		[form.singerName],
	);

	//검색 결과
	useEffect(() => {
		if (searchSingerDone) {
			console.log("/?searchSingerList", searchSingerList);
			setForm((prev) => ({
				...prev,
				singerList: searchSingerList !== null ? searchSingerList : [],
			}));
			if (searchSingerList !== null) {
				setVisible({
					...visible,
					searchSingerListVisible: true,
				});
			}
		}
	}, [searchSingerDone]);

	//카테고리 작성 이벤트 -> 검색호출
	useEffect(() => {
		let timer;
		const delay = 200;

		if (timer) {
			clearTimeout(timer);
		}
		const callAPI = () => {
			getSinger(form.singerName);
		};
		timer = setTimeout(callAPI, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [form.singerName]);

	//검색 엔터
	const handleEnter = useCallback(
		(e) => {
			if (e.code === "Enter") {
				getSinger(form.singerName);
			}
		},
		[form.singerName],
	);

	//작성
	const handleInput = useCallback((e) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	//가수 선택
	const handleSelectSinger = (item) => {
		setForm((prev) => ({
			...prev,
			singerName: "",
			singerEName: "",
			singerJName: "",
			selectedSinger: item,
		}));
		setVisible({
			...visible,
			searchSingerListVisible: false,
		});
		onChangeForm((prev) => ({
			...prev,
			singerId: item.id,
			singerName: item.name,
			singerEName: item.e_name,
			singerJName: item.j_name,
		}));
	};

	//선택된것 지우기
	const handleRemoveSelected = () => {
		setForm((prev) => ({
			...prev,
			selectedSinger: {},
		}));
		onChangeForm((prev) => ({
			...prev,
			singerId: "",
			singerName: "",
			singerEName: "",
			singerJName: "",
		}));
	};

	return (
		<div>
			<div>
				{Object.keys(form.selectedSinger).length > 0 ? (
					<div>
						<p>{form.selectedSinger.name}</p>
						<p>{form.selectedSinger.e_name}</p>
						<p>{form.selectedSinger.j_name}</p>

						<button onClick={handleRemoveSelected}>삭제</button>
					</div>
				) : (
					<input
						type="text"
						name="singerName"
						value={form.singerName}
						onChange={handleInput}
						placeholder="가수 검색"
						onKeyUp={handleEnter}
					/>
				)}
			</div>

			{visible.searchSingerListVisible && (
				<>
					{form.singerList.length > 0 ? (
						<ul>
							{form.singerList.map((list) => (
								<li key={list.id}>
									<p>{list.name}</p>
									<p>{list.j_name}</p>
									<p>{list.e_name}</p>
									<button onClick={() => handleSelectSinger(list)}>선택</button>
								</li>
							))}
						</ul>
					) : (
						<div>
							직접 작성 :<br />
							<input
								type="text"
								name="singerName"
								value={form.singerName}
								onChange={handleInput}
								placeholder="가수 한국어명"
							/>
							<br />
							<input
								type="text"
								name="singerEName"
								value={form.singerEName}
								onChange={handleInput}
								placeholder="가수 영문명"
							/>
							<br />
							<input
								type="text"
								name="singerJName"
								value={form.singerJName}
								onChange={handleInput}
								placeholder="가수 일본어명"
							/>
							<button
								onClick={() =>
									handleSelectSinger({
										id: 0,
										name: form.singerName,
										e_name: form.singerEName,
										j_name: form.singerJName,
									})
								}
							>
								직접 작성 완료
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default SearchSinger;
