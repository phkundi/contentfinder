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
import CustomAlert from "./components/layout/CustomAlert";

// Alert options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

ReactDOM.render(
  <AuthProvider>
    <ErrorProvider>
      <Theme>
        <AlertProvider template={CustomAlert} {...alertOptions}>
          <MessageProvider>
            <HashRouter>
              <GlobalStyle />
              <App />
            </HashRouter>
          </MessageProvider>
        </AlertProvider>
      </Theme>
    </ErrorProvider>
  </AuthProvider>,

  document.getElementById("root")
);
