import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";

const AppWithSnack = () => {
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      ref={notistackRef}
      action={key => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >
      <App />
    </SnackbarProvider>
  );
};

ReactDOM.render(<AppWithSnack />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
