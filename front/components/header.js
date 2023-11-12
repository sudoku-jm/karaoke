import React from 'react';
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    }
    return (
        <div>
            <button onClick={handleClick}>뒤로가기</button>
        </div>
    );
};

export default Header;