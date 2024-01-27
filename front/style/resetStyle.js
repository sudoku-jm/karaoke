import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
    ${reset}
    :root {
        --color-primary: #437ef7;
        --color-secondary: #f5faff;
        --color-black0: #000;
        --color-black2: #272d37;
        --color-white: #fff;
        --color-redf0: #f00;
        --color-ref-bg:#fff4f4;
        --color-grey-9: #999;
        --color-grey-b0: #b0b0b0;
        --color-grey-b4: #b4b4b4;
        --color-grey-7b: #7b7b7b;
        --color-grey-c5: #c5c5c5;
        --color-grey-c9: #c9c9c9;
        --color-grey-a4: #a4a4a4;
        --color-grey-db: #dbdbdb;
        --color-grey-f3: #f3f3f3;
        --color-grey-f5f5f7: #f5f5f7;
        --color-grey-bbbcc8:#BBBCC8;
        --color-grey-8E8E8E : #8E8E8E;
        --color-grey-EAEBF0 : #EAEBF0;
        --color-grey-777 : #777777;
        --color-grey-F1F1F1 : #F1F1F1;
        --color-grey-F7F7F8: #F7F7F8;
        --color-grey-B8B8B8 : #B8B8B8;
        --color-border1: #dae0e6;
        --color-blue-8B99B7 : #8B99B7;
        --color-background-F8FAFF: #F8FAFF;
        --color-background-FBFBFB : #FBFBFB;
        --color-background-EEF2FF : #eef2ff;
        --color-gradient : linear-gradient(180deg, #5C6A82 0%, #272D37 100%);
    }
    
`;

const CommonStyle = styled.section`
	* {
		font-family: "Noto Sans KR", sans-serif;
		box-sizing: border-box;
	}

	input[type="text"],
	select,
	textarea {
		padding: 10px;
		border: 1px solid var(--color-border1);
	}

	button {
		border: none;
	}

	header {
		position: relative;
		padding: 10px;
		width: 100%;
		height: 65px;
		h2 {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 18px;
		}

		a,
		button {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			background: none;
			font-size: 16px;
			font-weight: 700;
		}
		.prev,
		.cancel {
			left: 20px;
		}
		.insert {
			right: 20px;
			color: var(--color-primary);
		}
	}

	.cursor-p {
		cursor: pointer;
	}
	.btn-wrap {
		display: flex;
		justify-content: center;
		&.col2 {
			button {
				width: 50%;
			}
		}
	}
`;

export { GlobalStyle, CommonStyle };
