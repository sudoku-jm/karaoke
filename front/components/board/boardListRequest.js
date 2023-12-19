import React, { useState } from "react";

const BoardListRequest = ({ board }) => {
    const {
        id,
        b_title,
        Singer,
        Category,
        b_keumyong,
        b_taejin,
        b_tags,
        b_link,
        b_contents,
    } = board;

    return (
        <>
            {" "}
            <dd
                key={id}
                style={{
                    display: "flex",
                    height: "200px",
                    borderBottom: "1px solid #000",
                }}
            >
                <span>{Category?.name}</span>
                <span>{b_title}</span>
                <span>
                    {}
                    {Singer?.name}
                    <br />
                    {Singer?.e_name}
                    <br />
                    {Singer?.j_name}
                </span>
                <span>{b_keumyong}</span>
                <span>{b_taejin}</span>
                <span>{b_tags}</span>
                <span>{b_link}</span>
                <span>{b_contents}</span>
                <span></span>
            </dd>
        </>
    );
};

export default BoardListRequest;
