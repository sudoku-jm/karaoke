import React from "react";
import PropTypes from "prop-types";
import { GlobalStyle, CommonStyle } from "../style/resetStyle";

const AppLayout = ({ children }) => {
	return (
		<>
			<GlobalStyle />
			<CommonStyle>{children}</CommonStyle>
		</>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default AppLayout;
