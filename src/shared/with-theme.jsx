// @flow

import * as React from "react";
import { ThemeContext } from "grommet";

const withTheme = (WrappedComponent: any) => (props: any) => (
  <ThemeContext.Consumer>
    {theme => <WrappedComponent {...props} theme={theme} />}
  </ThemeContext.Consumer>
);

export default withTheme;
