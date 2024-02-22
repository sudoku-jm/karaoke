import styled from "styled-components";
import { media } from "./media";

const beforeAfterVerticalBar = `
	content: "";
	position: absolute;
	top: 50%;
	right: 0%;
	transform: translateY(-50%);
	width: 1px;
	height: 15px;
	background-color: var(--color-border1);
`;
const LabelItemStyle = `
	.label-item {
		padding: 2px 4px;
		border: 1px solid var(--color-border1);
		font-size: 12px;
		border-radius: 4px;
		color: var(--color-primary);
	}
`;
const SingerItemStyle = `
	.singer-item {
		em {
			position: relative;
			padding: 0 10px;
			color: var(--color-grey-777);
			line-height: 1.4;
			&:first-child {
				padding-left: 0;
			}
			&:last-child {
				&:after {
					display: none;
				}
			}
			&:after {
				${beforeAfterVerticalBar}
				height:10px;
			}
		}
	}
`;
const tagItemStyle = `
	.tags-items {
			margin: 10px 0 5px 0;
			span,
			a {
				display: inline-block;
				margin-right: 5px;
				margin-bottom: 5px;
				background-color: var(--color-secondary);
				padding: 4px;
				border-radius: 4px;
				color: var(--color-primary);
				font-size: 11px;
				text-decoration: none;
			}
		}
`;

const numberItemStyle = `
	display: flex;
	justify-content: center;
	dl {
		margin: 5px;
		padding: 10px;
		width: 50%;
		text-align: center;
		background-color: var(--color-secondary);
		border-radius: 10px;
		dt {
			display: inline-block;
			padding: 4px 8px;
			border-radius: 10px;
			color: var(--color-white);
			font-size: 11px;
			background: var(--color-primary);
		}
		dd {
			margin-top: 8px;
			font-weight: 700;
			color: var(--color-primary);
			font-size: 18px;
		}
	}
`;

const TabItemStyle = `
	.tab-handler{
		display:flex;
		flex-wrap:wrap;
		border-bottom:1px solid var(--color-border1);
		li{
			flex : 1;
			&.on{
				border-bottom:2px solid var(--color-primary);
				button{
					color:var(--color-primary);
				}
			}
			button{
				padding:15px;
				width:100%;
				background:none;
				color:var(--color-grey-7b);
			}
		}
	}
	.tab-contents{
		padding:50px 0;
		.tab-con{
			h3{
				padding: 0 15px;
				font-weight:700;
			}
			.none{
				text-align:center;
				color:var(--color-grey-7b);
				font-size:14px;
			}
			
		}
	}
`;

export const Container = styled.main`
	margin: 0 auto;
	width: 768px;
	${media.tablet`
		width:100%;
	`}
`;

export const BoardRequestListStyle = styled.div`
	${() => {
		let styles = "";
		styles += `
			li {
				margin-bottom: 10px;
				background-color: var(--color-white);
				padding: 15px;
				border-radius: 10px;
				font-size: 14px;
				&.modify {
				}

			}
			.top {
				span {
					display: inline-block;
					margin-right: 5px;
				}
			}
			.con {
				padding: 15px 0;
				.title {
					display: block;
					margin-bottom: 10px;
					font-weight: 700;
					font-size: 18px;
				}
				.link-itmes,
				.singer-item {
					margin-bottom:10px;
				}
			}
			.bottom {
			}

			.request-type {
				float:right;
				.before {
					color: var(--color-primary);
				}
			}

			`;

		styles += LabelItemStyle;
		styles += SingerItemStyle;

		styles += `
			.num-items {
				${numberItemStyle}
			}
		`;

		styles += tagItemStyle;
		return styles;
	}}
`;

export const MainContainerStyle = styled.main`
	padding: 40px 10px;
	.main__title {
		font-size: 2rem;
		font-weight: 700;
	}
	.main-btn-wrap {
		display: flex;
		justify-content: center;
		margin: 30px auto;
		button,
		a {
			margin: 0 5px;
			padding: 0 20px;
			text-decoration: none;
			text-align: center;
			min-width: 150px;
			font-size: 14px;
			line-height: 50px;
		}
		.btn-request {
			background-color: var(--color-grey-f5f5f7);
			border-radius: 10px;
			color: var(--color-primary);
		}
	}
`;

// 검색 리스트 스타일
export const SearchListContainerStyle = styled.main`
	padding: 10px;
	background-color: var(--color-background-EEF2FF);
`;

export const SearchListStyle = styled.ul``;

export const SearchListItemStyle = styled.li`
	${() => {
		let styles = "";
		styles += `
		margin-bottom: 15px;
		padding: 15px;
		background-color: var(--color-white);
		border-radius: 10px;
		font-size: 14px;
		position: relative;
		box-shadow: 0 5px 5px rgba(0, 0, 0, 0.03);
		
		.title {
			display: block;
			margin: 15px 0;
			font-size: 16px;
			font-weight: 700;
		}
	

		.side-wrap {
			position: absolute;
			top: 15px;
			right: 15px;
			& > button {
				position: absolute;
				top: 0px;
				right: 0px;
				background: none;
				width: 20px;
				height: 20px;
				cursor: pointer;
				&:hover {
					color: var(--color-primary);
				}
				span {
					display: inline-block;
					font-size: 18px;
				}
			}
			.side-btn-wrap {
				position: absolute;
				top: 30px;
				right: 0;
				width: 80px;
				padding: 8px;
				background-color: var(--color-white);
				border-radius: 4px;
				box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
				button {
					background: none;
					cursor: pointer;
					&:hover {
						color: var(--color-primary);
					}
				}
			}
		}

		.num-items {
			${numberItemStyle}
		}

		`;
		styles += tagItemStyle;
		styles += SingerItemStyle;
		styles += LabelItemStyle;
		return styles;
	}}
`;

export const SearchAreaStyle = styled.section`
	${({ $pageType }) => {
		let styles = "";
		if ($pageType == "SEARCH") {
			styles += `
				margin: 0 auto;
			`;
		} else {
			styles += `
				margin: 20px auto;
			`;
		}
		styles += `
		position: relative;
		input {
			padding: 10px 60px 10px 10px;
			width: 100%;
		}
		button {
			position: absolute;
			top: 0;
			right: 0;
			padding: 10px;
			width: 60px;
			font-size: 16px;
		}
		`;
		return styles;
	}}
`;

export const PopualRankKeywordListStyle = styled.div`
	.time-zone {
		display: flex;
		justify-content: space-between;
		width: 100%;

		& > span,
		& > em {
			margin: 5px;
			font-size: 12px;
			color: var(--color-grey-b0);
		}
	}
	ul {
		margin: 10px 0;
		li {
			a {
			}
		}
	}
`;

const PopupDefaultStyle = `
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
	z-index: 10;
`;

const FormStyle = `
	.form-viewer{
		margin:20px auto;
		
		& > p{
			font-weight:700;
			margin:30px 0 10px 0;
		}
		ul{
			li{
				display:flex;
				justify-content:space-between;
				flex-wrap:wrap;
				padding:15px 0;
				border-bottom:1px solid var(--color-border1);
				em{
					font-size:14px;
					&:first-child{
						color:var(--color-grey-B8B8B8);
					}
					&:last-child{
						max-width:80%;
						color:var(--color-black0);
					}
				}
			}
		}
		.links{
			padding:10px 0;
			& > em{
				display:block;
				margin-bottom:10px;
				color:var(--color-grey-B8B8B8);
			}
		}
	}	


`;

export const PageWriteStyle = styled.section`
	${({}) => {
		let styles = "";
		styles += PopupDefaultStyle;
		styles += FormStyle;

		styles += `
		background-color: var(--color-white);
		overflow-y: auto;
		.form-wrap {
			padding: 20px; 
			& > h3{
				margin-bottom:10px;
				text-align:center;
				font-size:24px;
			}
			& > p {
				line-height:1.4;
				text-align:center;
				font-size:18px;
			}
		}
		
		`;

		return styles;
	}}
`;

export const PopupInsertResultStyle = styled.section`
	${({}) => {
		let styles = "";
		styles += PopupDefaultStyle;

		styles += `
			background:var(--color-white);
			height:100vh;
			overflow-y:auto;
			.btn-wrap{
				margin:0 auto 60px auto;
				display:flex;
				justify-content: center;
				a,
				button{
					display:inline-block;
					text-decoration: none;
				}
			}
			.btn-link{
				margin:0 auto;
				padding:15px;
				background:var(--color-primary);
				color:var(--color-white);
				font-size:14px;
			}
		`;

		return styles;
	}}
`;

export const SearchWriteStyle = styled.div`
	${({ $type }) => {
		let styles = "";

		styles += `
		.form-input {
			input,
			select {
				border-radius: 4px;
			}
			button{
				padding:10px;
			}
		}
		.search-result-list{
			label{
				display:block;
				margin-bottom:10px;
				color:var(--color-grey-9);
				font-size:14px;
			}
			ul{
				overflow-y:auto;
				max-height:100px;
			}
			li{
				color:var(--color-primary);
				font-size:14px;
				button{
					margin:0 0 0 10px;
				}
			}
		}
		.user-write-area{
			margin:10px 0;
			padding:10px;
			background:var(--color-grey-f3);
			p{
				margin:5px 0 15px 0;
				text-align:center;
				font-size:14px;
			}
		}
		.user-write-item{
			padding:10px;
			background:var(--color-white);
			font-size:14px;
			label{
				display:block;
				margin-bottom:10px;
				color:var(--color-grey-9);
			}
			p{
				padding:5px;
				text-align:left;
			}
			input{
				margin-bottom:10px;
				width:100%;
			}
			button{
				display:block;
				width:100%;
				height:40px;
			}
		}
		.selected-item{
			position:relative;
			margin-bottom:10px;
			& > p{
				margin-bottom:10px;
				padding:12px 45px 12px 10px;
				border:1px solid var(--color-border1);
				font-size:14px;
			}
			button{
				position:absolute;
				top:0;
				right:0;
				width:45px;
				height:40px;
				padding:10px;
			}
		}
		`;

		if ($type == "tag") {
			styles += `
			.form-input {
				display: block;
				margin: 10px 0;
				& > input {
					width: 50%;
				}
				& > button{
					
				}
			}
			.selected-tag{
				display:inline-block;
				margin-bottom:5px;
				margin-right:10px;
				font-size:12px;
				button{
					margin-left:5px;
					background:var( --color-grey-a4 );
					border-radius:50%;
					width:18px;
					height:18px;
					text-align:center;
					color:var(--color-white);
					font-size:10px;
					line-height:15px;
					cursor:pointer;
				}
			}
			`;
		} else {
			styles += `
			.form-input {
				display: block;
				margin: 10px 0;
				& > input,
				& > textarea {
					width: 100%;
				}
			}
			`;
		}

		styles += `
			.form-link-btn {
				margin: 10px 0;
				button {
					margin-right: 10px;
					padding: 10px;
				}
			}`;

		if ($type == "link") {
			styles += `
				.links-added{
					margin-top:10px;
					figure{
						position:relative;
						& > div{
							display:inline-block;
						}
						& > button{
							position:absolute;
							top:50%;
							transform:translateY(-50%);
							margin-left:10px;
					
						}
					}
				}
			`;
		}

		if ($type == "singer") {
			styles += `
			.selected-item{
				.en,
				.jp{
					background:var(--color-grey-f5f5f7);
					color:var(--color-grey-7b);
				}
			}
			.search-result-item{
				padding:5px;
				border-bottom:1px solid var(--color-border1);
				cursor:pointer;
				span{
					display:flex;
					justify-content: space-between;
					line-height:1.4;
					em{
						color:var( --color-grey-7b);
					}
				}
			}
			`;
		}

		return styles;
	}}
`;

const OtherListStyle = `
.others-wrap{
	padding:15px;
	background:var(--color-background-EEF2FF);
	h3{
		font-weight:700;
		margin: 30px 0 10px 0;
	}
}
.other-items{
	a{
		text-decoration:none;
	}
	.swiper-slide{
		width:auto !important;
	}
	.other-item{
		margin-right:10px;
		min-width:200px;
		min-height:185px;
		padding:15px;
		border-radius:10px;
		background:var(--color-white);
		strong{
			display:block;
			margin-bottom:10px;
			font-weight:700;
			color:var(--color-black2);
		}
		.singer-item{
			em{
				display:block;
				color:var( --color-grey-777);
				font-size:12px;
				line-height:1.2;
			}
		}
		.num-items {
			margin-top:10px;
			${numberItemStyle}
		}
	}
}
`;

//상세 스타일
export const DetailContainerStyle = styled.main`
	${({}) => {
		let styles = "";
		styles += FormStyle;
		styles += `
			.detail-con {
				padding: 15px;
				.title {
					display: block;
					margin: 15px 0;
					font-size: 20px;
					line-height: 1.4;
					color: var(--color-black0);
					em {
						font-weight: 700;
					}
					a {
						margin-right: 10px;
						color: var(--color-primary);
						font-weight: 700;
						text-decoration: none;
						display: inline-block;
						word-break: keep-all;
					}
				}
				.last-update{
					margin:10px auto;
					color:var(--color-grey-7b);
					font-size:12px;
					text-align:right;
					em{
						margin-right:10px;
					}
				}
				.links-wrap{
					margin: 30px auto;
					border-radius:20px;
					overflow:hidden;
					.swiper-button-prev,
					.swiper-button-next{
						z-index:20;
					}
				}
				.num{
					color: var(--color-primary) !important;
					font-weight:700;
				}
				.tags-items{
					text-align:right;
					a{
						display: inline-block;
						margin-right: 5px;
						margin-bottom: 5px;
						text-decoration: none;
						color: var(--color-primary);
						word-break: keep-all;
					}
				}
				.form-cols{
					margin:60px auto;
					&.col3{
						li{
							width:33.33%;
						}
					}
					ul{
						display:flex;
						width:100%;
						li{
							position:relative;
							padding: 0 10px;
							&:after{
								${beforeAfterVerticalBar}
							}
							&:last-child{
								&:after{
									display:none;
								}
							}
							em{
								display:block;
								margin:5px 0 10px 0;
								text-align:center;
								font-size:12px;
							
							}
							span{
								display:block;
								text-align:center;

							}
						}
					}
				}
			}
		`;

		styles += OtherListStyle;
		styles += TabItemStyle;

		return styles;
	}}
`;
