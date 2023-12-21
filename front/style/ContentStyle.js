import styled from "styled-components";

export const Container = styled.main`
margin:0 auto;
width:640px;
`;

export const BoardRequestListStyle = styled.div`
h3{
    font-size:1.8rem;
}
tr{
    th{
        font-weight:700;
    }
    th,
    td{
        padding:10px 5px;
        border-bottom:1px solid var(--color-border1);
    }
    &.modify{
        td{
            background:var(--color-ref-bg);
        }
    }
}
.link{
    font-size:12px;
}
.sing-code{
    padding:4px;
    background:var(--color-secondary);
    font-weight:700;
    font-size:14px;
}
`;

