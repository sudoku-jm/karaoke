import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyle = createGlobalStyle`
    :root {
        --color-primary: #437ef7;
        --color-secondary: #f5faff;
        --color-black0: #000;
        --color-black2: #272d37;
        --color-white: #fff;
        --color-redf0: #f00;
        --color-ref-bg:#fff4f4;
        --color-grey-9: #999;
        --color-grey-b0: #b0b0b0;
        --color-grey-b4: #b4b4b4;
        --color-grey-7b: #7b7b7b;
        --color-grey-c5: #c5c5c5;
        --color-grey-c9: #c9c9c9;
        --color-grey-a4: #a4a4a4;
        --color-grey-db: #dbdbdb;
        --color-grey-f3: #f3f3f3;
        --color-grey-f5f5f7: #f5f5f7;
        --color-grey-bbbcc8:#BBBCC8;
        --color-grey-8E8E8E : #8E8E8E;
        --color-grey-EAEBF0 : #EAEBF0;
        --color-grey-777 : #777777;
        --color-grey-F1F1F1 : #F1F1F1;
        --color-grey-F7F7F8: #F7F7F8;
        --color-grey-B8B8B8 : #B8B8B8;
        --color-border1: #dae0e6;
        --color-blue-8B99B7 : #8B99B7;
        --color-background-F8FAFF: #F8FAFF;
        --color-background-FBFBFB : #FBFBFB;
        --color-gradient : linear-gradient(180deg, #5C6A82 0%, #272D37 100%);
    }

    ${reset}
`;

export { GlobalStyle };
