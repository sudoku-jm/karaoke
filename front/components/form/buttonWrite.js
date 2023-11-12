import React from "react";
import styled from "styled-components";

const ButtonWriteStyle = styled.button``;
const ButtonWrite = ({ handleWrite }) => {
	return <ButtonWriteStyle onClick={handleWrite}>곡신청</ButtonWriteStyle>;
};

export default ButtonWrite;
