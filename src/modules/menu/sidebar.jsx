// @flow

import * as React from "react";
import { pure } from "recompose";
import { Box, Button } from "grommet";
import { Search, FormClose, Dashboard, Tag } from "grommet-icons";
import AnimationBox from "shared/animation-box";
import SidebarLink from "./sidebar-link";
import LogOutButton from "./log-out-button";

const CloseIcon = <FormClose size="large" />;
const OPTIONS_BOX_PAD = { horizontal: "medium", bottom: "medium" };

type Props = {
  +logoutMenuOptionHandler: React.ElementType,
  +onOptionClick: void => void
};

const Sidebar = ({
  logoutMenuOptionHandler: LogoutMenuOptionHandler,
  onOptionClick
}: Props) => (
  <AnimationBox
    animation="fadeIn"
    tag="aside"
    flex="grow"
    fill="height"
    background="light-1"
    direction="column"
    align="end"
    data-test="sidebar"
  >
    <Button
      icon={CloseIcon}
      onClick={onOptionClick}
      a11yTitle="Close the sidebar"
    />
    <Box
      pad={OPTIONS_BOX_PAD}
      flex="grow"
      direction="column"
      justify="between"
      fill="horizontal"
    >
      <Box direction="column">
        <SidebarLink
          label="Dashboard"
          icon={Dashboard}
          to="/"
          onClick={onOptionClick}
        />
        <SidebarLink
          label="Search"
          icon={Search}
          to="/search"
          onClick={onOptionClick}
        />
        <SidebarLink
          label="Medium Tags"
          icon={Tag}
          to="/tag/medium"
          onClick={onOptionClick}
        />
        <SidebarLink
          label="Style Tags"
          icon={Tag}
          to="/tag/style"
          onClick={onOptionClick}
        />
        <SidebarLink
          label="Audience Tags"
          icon={Tag}
          to="/tag/audience"
          onClick={onOptionClick}
        />
        <SidebarLink
          label="Geo Tags"
          icon={Tag}
          to="/tag/geo"
          onClick={onOptionClick}
        />
      </Box>
      <LogoutMenuOptionHandler component={LogOutButton} />
    </Box>
  </AnimationBox>
);

export default pure(Sidebar);
