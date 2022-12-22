import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
   * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
       font-family: "Montserrat", sans-serif;
   }
   button {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: inherit;

        &:disabled {
        cursor: default;
        opacity:0.5
        }
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style-type: none;
    }
`;

export default GlobalStyles;
