import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../components/AppLayout";
import Top from "../../components/form/top";

const RequestInfo = () => {
	const router = useRouter();
	const id = router.query?.id;
	console.log("id??", id);
	return (
		<AppLayout>
			<Top insertType="BOARD_DETAIL" />
		</AppLayout>
	);
};

export default RequestInfo;
