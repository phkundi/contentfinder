import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import Theme from "./context/ThemeContext";
import GlobalStyle from "./components/styles/GlobalStyle";
import App from "./components/App";
import { AuthProvider } from "./context/authContext";
import { MessageProvider } from "./context/messageContext";
import { ErrorProvider } from "./context/errorContext";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Alert options
const alertOptions = {
  timeout: 3000,
  position: "top right",
};

ReactDOM.render(
  <AuthProvider>
    <ErrorProvider>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <MessageProvider>
          <Theme>
            <HashRouter>
              <GlobalStyle />
              <App />
            </HashRouter>
          </Theme>
        </MessageProvider>
      </AlertProvider>
    </ErrorProvider>
  </AuthProvider>,

  document.getElementById("root")
);
