import React from "react";
import PropTypes from "prop-types";
import { GlobalStyle } from "../style/resetStyle";

const AppLayout = ({ children }) => {
    return (
        <>
            <GlobalStyle />

            {children}

        </>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AppLayout;
