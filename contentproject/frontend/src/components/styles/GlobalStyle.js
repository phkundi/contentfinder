import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F7F7F9;
    overflow: auto;
    font-family: 'Poppins', sans-serif;
  }

  a {
    color: ${(props) => props.theme.colors.primary}
  }
`;
export default GlobalStyle;
