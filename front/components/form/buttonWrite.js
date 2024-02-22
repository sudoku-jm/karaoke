import React from "react";
import styled from "styled-components";

const ButtonWriteStyle = styled.button`
	${({ $state }) => {
		let styles = "";
		console.log("$state", $state);

		if (!$state) {
			styles += `
			background-color: var(--color-primary);
			color: var(--color-white);
			border-radius: 10px;
			`;
		} else {
			styles += `
				position:fixed;
				top:10px;
				left:20px;
				z-index:11;
				margin:0 !important;
				padding:0 !important;
				min-width:auto !important;
				background:none !important;
				font-size: 16px !important;
			`;
		}
		return styles;
	}}
`;
const ButtonWrite = ({ handleWrite, formVisible }) => {
	return (
		<ButtonWriteStyle onClick={handleWrite} $state={formVisible}>
			{formVisible ? "닫기" : "곡 신청"}
		</ButtonWriteStyle>
	);
};

export default ButtonWrite;
