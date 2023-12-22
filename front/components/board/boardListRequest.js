import React from "react";
import { youtubeParser } from "../../func/board";
import { Validation } from "../../func/common";

const BoardListRequest = ({
    board,
    handleInsertCategory,
    handleInsertSinger,
}) => {
    const {
        id,
        b_title,
        Singer,
        SingerId,
        b_singer,
        b_e_singer,
        b_j_singer,
        Category,
        CategoryId,
        b_category,
        b_keumyong,
        b_taejin,
        b_tags,
        b_link,
        b_contents,
    } = board;

    return (
        <tr key={id} className={`${board.new == "Y" ? "" : "modify"}`}>
            <td>{board.new == "Y" ? "등록요청" : "수정요청"}</td>
            <td>
                {CategoryId !== null ? (
                    <>{Category?.name}</>
                ) : (
                    <>
                        {b_category}
                        <br />
                        <button
                            onClick={() => handleInsertCategory(id, b_category)}
                        >
                            카테고리 추가
                        </button>
                    </>
                )}
            </td>
            <td>{b_title}</td>
            <td>
                {SingerId !== null ? (
                    <>
                        {Singer?.name}
                        <br />
                        {Singer?.e_name}
                        <br />
                        {Singer?.j_name}
                    </>
                ) : (
                    <>
                        {b_singer}
                        <br />
                        {b_e_singer}
                        <br />
                        {b_j_singer}
                        <br />
                        <button
                            onClick={() =>
                                handleInsertSinger(
                                    id,
                                    b_singer,
                                    b_e_singer,
                                    b_j_singer
                                )
                            }
                        >
                            가수 추가
                        </button>
                    </>
                )}
            </td>
            <td>
                {Validation.isEmpty(b_keumyong) ? (
                    "-"
                ) : (
                    <em className="sing-code">{b_keumyong}</em>
                )}
            </td>
            <td>
                {Validation.isEmpty(b_taejin) ? (
                    "-"
                ) : (
                    <em className="sing-code">{b_taejin}</em>
                )}
            </td>
            <td>{b_tags}</td>
            <td>
                {Validation.isEmpty(b_link)
                    ? "-"
                    : b_link.split(",").map((item, idx) => (
                          <>
                              <span
                                  key={idx}
                                  className="link-lists"
                                  dangerouslySetInnerHTML={{
                                      __html: youtubeParser(item, 150, 100),
                                  }}
                              ></span>
                              <em className="link">{b_link}</em>
                          </>
                      ))}
            </td>
            <td>{b_contents}</td>
            <td>
                <button>음악추가</button>
            </td>
        </tr>
    );
};

export default BoardListRequest;
