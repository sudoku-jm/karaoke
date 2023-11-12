import React from "react";
import Link from "next/link";

const Menu = () => {
	return (
		<div>
			<Link href="/board">
				<a>신청 수정 리스트 보기</a>
			</Link>
		</div>
	);
};

export default Menu;
