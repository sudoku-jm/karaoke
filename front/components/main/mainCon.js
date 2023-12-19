import React, { useCallback, useEffect, useState } from "react";
import MainSearch from "./mainSearch";
import RankList from "./rankList";
import ButtonWrite from "../form/buttonWrite";
import WriteForm from "../form/writeForm";
import { useDispatch } from "react-redux";
import { INSERT_BOARD_RESET } from "../../reducers/music";
import Link from "next/link";

const MainCon = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState({
        visibleWriteForm: false,
    });

    //곡 요청 버튼 클릭 폼 보이기
    const handleWrite = useCallback(() => {
        dispatch({
            type: INSERT_BOARD_RESET,
        });
        setVisible((prev) => ({
            ...prev,
            visibleWriteForm: !prev.visibleWriteForm,
        }));
    }, []);
    return (
        <>
            <MainSearch />
            <RankList />
            <ButtonWrite handleWrite={handleWrite} />
            <Link href="/board">요청리스트</Link>
            {visible.visibleWriteForm && <WriteForm insertType="NEW" />}
        </>
    );
};

export default MainCon;
