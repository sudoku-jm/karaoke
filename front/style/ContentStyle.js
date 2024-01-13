import styled from "styled-components";
import { media } from "./media";

export const Container = styled.main`
	margin: 0 auto;
	width: 768px;
	${media.tablet`
		width:100%;
	`}
`;

export const BoardRequestListStyle = styled.div`
	h3 {
		font-size: 1.8rem;
	}
	tr {
		th {
			font-weight: 700;
		}
		th,
		td {
			padding: 10px 5px;
			border-bottom: 1px solid var(--color-border1);
		}
		&.modify {
			td {
				background: var(--color-ref-bg);
			}
		}
	}
	.link {
		font-size: 12px;
		word-break: break-all;
	}
	.sing-code {
		padding: 4px;
		background: var(--color-secondary);
		font-weight: 700;
		font-size: 14px;
	}
`;

export const MainContainerStyle = styled.main`
	padding: 40px 10px;
	.main__title {
		font-size: 2rem;
		font-weight: 700;
	}
`;

export const SearchAreaStyle = styled.section`
	margin: 20px auto;
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
				padding:15px 0;
				border-bottom:1px solid var(--color-border1);
				em{
					font-size:14px;
					&:first-child{
						color:var(--color-grey-B8B8B8);
					}
					&:last-child{
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
