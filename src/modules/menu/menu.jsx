// @flow

import type { HOC } from "recompose";

import * as React from "react";
import { Box, Responsive, Layer } from "grommet";
import { withRouter } from "react-router-dom";
import { withStateHandlers, compose } from "recompose";
import Nav from "./nav";
import Sidebar from "./sidebar";

const BOX_STYLE = { minHeight: "100vh" };

type Props = {
  +logoutMenuOptionHandler: React.ElementType,
  +searchMenuOptionHandler: React.ElementType,
  +children: any
};

type EnhancedProps = {
  ...$Exact<Props>, // TODO this might be a flow bug that Exact is required here
  sidebarOpen: boolean,
  setSidebarOpen: void => void,
  setSidebarClosed: void => void
};

export const Menu = ({
  sidebarOpen,
  logoutMenuOptionHandler,
  searchMenuOptionHandler,
  children,
  setSidebarOpen,
  setSidebarClosed
}: EnhancedProps) => (
  <Responsive onChange={setSidebarClosed}>
    <Box direction="column" style={BOX_STYLE}>
      <Nav
        sidebarOpen={sidebarOpen}
        onMenuClick={setSidebarOpen}
        searchMenuOptionHandler={searchMenuOptionHandler}
      />
      {sidebarOpen && (
        <Layer
          full="vertical"
          modal
          responsive
          plain
          position="right"
          onClickOutside={setSidebarClosed}
          onEsc={setSidebarClosed}
        >
          <Sidebar
            onOptionClick={setSidebarClosed}
            logoutMenuOptionHandler={logoutMenuOptionHandler}
          />
        </Layer>
      )}
      {children}
    </Box>
  </Responsive>
);

const enhancer: HOC<*, Props> = compose(
  withRouter,
  withStateHandlers(
    { sidebarOpen: false },
    {
      setSidebarOpen: () => () => ({ sidebarOpen: true }),
      setSidebarClosed: () => () => ({ sidebarOpen: false })
    }
  )
);

export default enhancer(Menu);
