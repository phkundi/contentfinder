import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }

  body,html{
    width: 100vw;
    position: relative;
    overflow-x: hidden;
  }

  body {
    background-color: #F7F7F9;
    overflow: auto;
    font-family: 'Poppins', sans-serif;
  }

  a {
    color: ${(props) => props.theme.colors.primary}
  }

  button{
    border: none;
  }

  button:focus {
    outline: none;
  }
`;
export default GlobalStyle;
