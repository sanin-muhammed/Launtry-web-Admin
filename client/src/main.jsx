import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import store from "./Redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider maxSnack={3} >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>
);
