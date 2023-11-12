import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
   
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }
    html{
        font-size:62.5%; /*기본 브라우저 = 16px. 16px의 62.5%는 10px = 1rem.*/
    }
    body{
        font-family: 'Noto Sans KR', sans-serif;
        font-weight:500;
    }
    ul,
    li,
    ol {
        list-style: none;
    }
    img,
    fieldset {
        border: 0;
    }
    img {
        vertical-align: top;
    }
    a,
    a:link {
        text-decoration: none;
        color: #000;
    }
    input,
    select,
    textarea,
    button {
        font-family: 'Noto Sans KR', sans-serif;
        font-weight:500;
        vertical-align: middle;
        border-radius: 0;
        cursor: pointer;
        /*ios대응*/
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-border-radius: 0;
        background:none;
    }
    input::placeholder,
    select::placeholder,
    textarea::placeholder,
    button::placeholder{
        color:var(--color-c2c2c5);
    }
    input[type="text"],
    input[type="password"]{
        border:0;
    }
    
    input[type="text"]:focus,
    input[type="text"]:hover {
        outline: none;
    }
    input[type="checkbox"],
    input[type="radio"] {
        cursor: pointer;
    }
    input[type="button"] {
        border: none;
    }
    textarea:disabled {
        background: var(--color-f0f0f0);
        color: var(--color-black333);
    }
    i,
    em,
    address {
        font-style: normal;
    }
    table {
        table-layout: fixed;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
    }
    legend,
    caption {
        line-height: 0;
        width: 0;
        height: 0;
        overflow: hidden;
        font-size: 0;
    }
    button {
        border: 0;

        cursor: pointer;
    }
`;

export default { GlobalStyle };
