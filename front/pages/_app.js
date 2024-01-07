import React from "react";
import PropTypes from "prop-types";
import wrapper from "../store/configureStore";
import Head from "next/head";
const OtakuKaraoke = ({ Component }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				></meta>
				<title>OtakuKaraoke</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;500;700;900&display=swap"
					rel="stylesheet"
				></link>
			</Head>
			<Component />
		</>
	);
};

OtakuKaraoke.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(OtakuKaraoke);
