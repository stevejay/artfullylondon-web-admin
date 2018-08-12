// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "sanitize.css";
import { Grommet } from "grommet";
import history from "./history";
import registerServiceWorker from "./registerServiceWorker";
import App from "./app";
import theme from "./theme";

const reactRoot = document.getElementById("root");

reactRoot &&
  ReactDOM.render(
    <Router history={history}>
      <Grommet full theme={theme}>
        <App />
      </Grommet>
    </Router>,
    reactRoot
  );

registerServiceWorker();
