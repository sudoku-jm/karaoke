import { useRouter } from "next/router";
import React from "react";

const MusicInfo = () => {
    const router = useRouter();
    const musicTxt = router.query;
    return <div></div>;
};

export default MusicInfo;
