import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		try {
			// 원래 document 기능에 스타일 컴포넌트 서버사이드렌더링 할 수 있게 만들어 주도록 한다.
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});
			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} catch (error) {
			console.error(error);
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html>
				<Head></Head>
				<body>
					{/* <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Cdom4%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019" /> */}
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
