import React from "react";
import { ThemeProvider } from "styled-components";

const size = {
  mobileS: "320px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "1800px",
  desktopL: "2560px",
};

const theme = {
  colors: {
    primary: "#0751ff",
    muted: "rgba(0, 0, 0, 0.3)",
    red: "#EA4335",
  },
  fonts: ["sans-serif", "Poppins"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
  boxShadow: {
    light: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    medium: "0 1px 20px rgba(0, 0, 0, 0.12), 0 1px 10px rgba(0, 0, 0, 0.14)",
  },
  device: {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
