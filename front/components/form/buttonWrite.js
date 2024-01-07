import React from "react";
import styled from "styled-components";

const ButtonWriteStyle = styled.button`
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 75px;
	height: 75px;
	border-radius: 50%;
	font-size: 16px;
	background-color: var(--color-primary);
	color: var(--color-white);
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
	cursor: pointer;
	z-index: 20;
`;
const ButtonWrite = ({ handleWrite, formVisible }) => {
	return (
		<ButtonWriteStyle onClick={handleWrite}>
			{formVisible ? "닫기" : "곡 신청"}
		</ButtonWriteStyle>
	);
};

export default ButtonWrite;
