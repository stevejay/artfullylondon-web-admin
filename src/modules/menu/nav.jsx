// @flow

import * as React from "react";
import { pure } from "recompose";
import { Box, Button } from "grommet";
import { Menu } from "grommet-icons";
import styled from "styled-components";
import Logo from "./logo";
import SearchButton from "./search-button";

const MenuIcon = <Menu color="light-1" size="large" />;
const NAV_BOX_PAD = { horizontal: "medium", vertical: "xsmall" };

const StyledBox = styled(Box)`
  z-index: 2;
  box-shadow: 0px 3px 8px rgba(100, 100, 100, 0.75);
`;

type Props = {
  +sidebarOpen: boolean,
  +searchMenuOptionHandler: React.ElementType,
  +onMenuClick: () => mixed
};

const Nav = ({
  sidebarOpen,
  searchMenuOptionHandler: SearchMenuOptionHandler,
  onMenuClick
}: Props) => (
  <StyledBox
    tag="nav"
    direction="row"
    background="brand"
    pad={NAV_BOX_PAD}
    align="center"
    responsive
    flex={false}
  >
    <Logo />
    <SearchMenuOptionHandler component={SearchButton} />
    <Button
      color="light-1"
      icon={MenuIcon}
      onClick={onMenuClick}
      a11yTitle="Open sidebar menu"
      aria-haspopup
      aria-expanded={sidebarOpen}
      data-test="open sidebar"
    />
  </StyledBox>
);

export default pure(Nav);
