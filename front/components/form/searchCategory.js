import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	SEARCH_CATEGORY_REQUEST,
	handleGetCategoryList,
} from "../../reducers/music";
import { Validation } from "../../func/common";

const SearchCategory = ({ insertForm, onChangeForm }) => {
	const dispatch = useDispatch();
	const {
		searchCategoryList,
		searchCategoryDone,
		searchCategoryLoading,
		categoryList,
		getCategoryDone,
	} = useSelector((state) => state.music);
	const [category, setCategory] = useState({
		categoryName: "", //직접작성
		categoryList: [], //리스트 데이터
		searchCategoryList: [], // 검색 결과 리스트
		selectedCategory: "",
	});
	const [visible, setVisible] = useState({
		searchCateListVisible: false,
		allCategoryList: false,
	});
	const [mount, setMount] = useState(false);

	//[수정] 카테고리 데이터 넣기
	useEffect(() => {
		if (!Validation.isEmpty(insertForm.categoryName)) {
			setCategory((prev) => ({
				...prev,
				categoryId: insertForm.categoryId,
				selectedCategory: insertForm.categoryName,
			}));
		}
	}, [insertForm]);

	//카테고리 검색
	const getCategory = useCallback(
		(name) => {
			if (name == "") {
				setVisible({
					...visible,
					searchCateListVisible: false,
				});
			}
			if (mount) {
				if (name !== "" && !searchCategoryLoading) {
					dispatch({
						type: SEARCH_CATEGORY_REQUEST,
						data: {
							categoryName: name,
						},
					});
				}
			}
		},
		[mount, category.categoryName],
	);

	//검색 결과
	useEffect(() => {
		if (searchCategoryDone) {
			setMount(false);
			setCategory((prev) => ({
				...prev,
				searchCategoryList:
					searchCategoryList !== null ? searchCategoryList : [],
			}));
			if (searchCategoryList !== null) {
				setVisible({
					...visible,
					searchCateListVisible: true,
				});
			}
		}
	}, [searchCategoryDone]);

	//카테고리 작성 이벤트 -> 검색호출
	useEffect(() => {
		let timer;
		const delay = 400;

		if (timer) {
			clearTimeout(timer);
		}
		const callAPI = () => {
			setMount(true);
			getCategory(category.categoryName);
		};
		timer = setTimeout(callAPI, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [category.categoryName]);

	//전체 카테고리 리스트 결과
	useEffect(() => {
		if (getCategoryDone) {
			setCategory((prev) => ({
				...prev,
				categoryList,
			}));

			if (categoryList.length > 0) {
				setVisible({
					...visible,
					allCategoryList: true,
				});
			}
		}
	}, [getCategoryDone]);

	//검색 엔터
	const handleEnter = useCallback(
		(e) => {
			if (e.code === "Enter") {
				setMount(true);
				getCategory(category.categoryName);
			}
		},
		[category.categoryName],
	);

	//작성
	const handleInput = useCallback((e) => {
		const { name, value } = e.target;

		switch (name) {
			case "categoryName":
				//영어, 일본어, 한국어, 숫자, 특수문자만 검색 가능. 이모지 검색불가.
				// category.searchCategoryList = [];
				break;

			default:
				break;
		}

		setCategory((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	//카테고리 선택
	const handleSelectCategory = (item) => {
		setCategory((prev) => ({
			...prev,
			categoryName: "",
			selectedCategory: item.name,
		}));
		setVisible({
			...visible,
			searchCateListVisible: false,
		});
		onChangeForm((prev) => ({
			...prev,
			categoryId: item.id !== 0 ? item.id : "",
			categoryName: item.name,
		}));
	};

	//선택된것 지우기
	const handleRemoveSelected = () => {
		setCategory((prev) => ({
			...prev,
			selectedCategory: "",
		}));
		onChangeForm((prev) => ({
			...prev,
			categoryId: "",
			categoryName: "",
		}));
	};

	// 카테고리 리스트 전체 보기
	const handleViewCategoryList = useCallback(() => {
		if (categoryList == null) {
			dispatch(handleGetCategoryList());
		} else {
			setVisible({
				...visible,
				allCategoryList: true,
			});
		}
	}, [categoryList]);
	const handleCloseCategoryList = () => {
		setVisible({
			...visible,
			allCategoryList: false,
		});
	};
	return (
		<>
			<div>
				{category.selectedCategory !== "" && (
					<>
						{category.selectedCategory}
						<button onClick={handleRemoveSelected}>삭제</button>
					</>
				)}
			</div>
			{category.selectedCategory == "" && (
				<input
					type="text"
					name="categoryName"
					value={category.categoryName}
					placeholder="카테고리 검색.예) Jpop, 나루토, 블리치"
					onChange={handleInput}
					onKeyUp={handleEnter}
				/>
			)}

			<div>
				{visible.searchCateListVisible && (
					<>
						{category.searchCategoryList.length > 0 && (
							<ul>
								{category.searchCategoryList.map((list) => (
									<li key={list.id}>
										{list.name}
										<button onClick={() => handleSelectCategory(list)}>
											선택
										</button>
									</li>
								))}
							</ul>
						)}
						<p>리스트에 없어요 직접 작성할래요</p>
						<div>
							직접 작성 :{" "}
							<span>
								{category.categoryName}
								<button
									onClick={() =>
										handleSelectCategory({
											id: 0,
											name: category.categoryName,
										})
									}
								>
									선택
								</button>
							</span>
						</div>
					</>
				)}
			</div>
			<div>
				<button onClick={() => handleViewCategoryList()}>
					카테고리 리스트 전체 보기
				</button>
			</div>
			<div>
				{visible.allCategoryList && (
					<>
						<button onClick={handleCloseCategoryList}>닫기</button>
						{category.categoryList.length > 0 ? (
							<ul>
								{category.categoryList.map((list) => (
									<li key={list.id}>{list.name}</li>
								))}
							</ul>
						) : (
							<span>카테고리 리스트가 없습니다.</span>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default SearchCategory;
