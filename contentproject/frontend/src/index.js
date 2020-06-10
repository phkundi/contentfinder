import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Theme from "./context/ThemeContext";
import GlobalStyle from "./components/styles/GlobalStyle";
import App from "./components/App";
import { AuthProvider } from "./context/authContext";
import { ContentProvider } from "./context/contentContext";
import { MessageProvider } from "./context/messageContext";
import { ErrorProvider } from "./context/errorContext";
import { Provider as AlertProvider } from "react-alert";
import CustomAlert from "./components/layout/CustomAlert";

// Alert options
const alertOptions = {
  timeout: 5000,
  position: "top center",
};

ReactDOM.render(
  <Theme>
    <AlertProvider template={CustomAlert} {...alertOptions}>
      <AuthProvider>
        <ErrorProvider>
          <MessageProvider>
            <ContentProvider>
              <BrowserRouter>
                <GlobalStyle />
                <App />
              </BrowserRouter>
            </ContentProvider>
          </MessageProvider>
        </ErrorProvider>
      </AuthProvider>
    </AlertProvider>
  </Theme>,
  document.getElementById("root")
);
