import React from "react";
import PropTypes from "prop-types";
import wrapper from "../store/configureStore";
import Head from "next/head";
const OtakuKaraoke = ({ Component }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>OtakuKaraoke</title>
			</Head>
			<Component />
		</>
	);
};

OtakuKaraoke.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(OtakuKaraoke);
