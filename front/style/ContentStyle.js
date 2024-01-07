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

export const PageWriteStyle = styled.section`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--color-white);
	overflow-y: auto;
	z-index: 10;
	.form-wrap {
		padding: 20px;
	}
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

		return styles;
	}}
`;
