import "react-perfect-scrollbar/dist/css/styles.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import "nprogress/nprogress.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import StyledEngineProvider from "@material-ui/core/StyledEngineProvider";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { SettingsInitializer } from "./modules/settings/components/settings-initializer";
import React from "react";
import { AuthListener } from "./modules/authentication/components/auth-listener";
import axios from 'axios';

// axios.defaults.baseURL = 'https://slark-backend.herokuapp.com/'
axios.defaults.baseURL = "localhost:4000/api/services";
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem('token') || null;
axios.defaults.headers.get["Accepts"] = "application/json";

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsInitializer>
            <BrowserRouter>
              <AuthListener>
                <App />
              </AuthListener>
            </BrowserRouter>
          </SettingsInitializer>
        </LocalizationProvider>
      </StyledEngineProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
