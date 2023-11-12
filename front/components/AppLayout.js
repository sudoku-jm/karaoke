import React from "react";
import PropTypes from "prop-types";
// import { GlobalStyle } from "../style/GlobalStyle";

const AppLayout = ({ children }) => {
	return (
		<div>
			{/* <GlobalStyle /> */}
			{children}
		</div>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default AppLayout;
