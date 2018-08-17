// @flow

import * as React from "react";
import { Box } from "grommet";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withScreenshot } from "storybook-chrome-screenshot";
import { Dashboard } from "grommet-icons";
import { allWidths } from "testing/screenshot-options";
import Menu from "./menu";
import Logo from "./logo";
import Nav from "./nav";
import Sidebar from "./sidebar";
import SidebarLink from "./sidebar-link";
import SearchButton from "./search-button";
import LogOutButton from "./log-out-button";

const Logout = () => <Box pad="small">Log Out</Box>;
const Search = () => <div>Search</div>;

storiesOf("Menu/Logo", module).add("default", () => (
  <Logo onClick={action("clicked")} />
));

storiesOf("Menu/Nav", module)
  .addDecorator(withScreenshot(allWidths))
  .addDecorator((story, context) => <Box width="full">{story(context)}</Box>)
  .add("default", () => (
    <Nav
      sidebarOpen={false}
      searchMenuOptionHandler={Search}
      onMenuClick={action("clicked")}
    />
  ));

storiesOf("Menu/Sidebar", module)
  .addDecorator(withScreenshot(allWidths))
  .addDecorator((story, context) => <Box width="full">{story(context)}</Box>)
  .add("default", () => (
    <Sidebar
      logoutMenuOptionHandler={Logout}
      onOptionClick={action("clicked")}
    />
  ));

storiesOf("Menu/SidebarLink", module)
  .addDecorator(withScreenshot())
  .add("default", () => (
    <SidebarLink
      label="The Link Label"
      to="/foo"
      icon={Dashboard}
      onClick={action("clicked")}
    />
  ));

storiesOf("Menu/SearchButton", module)
  .addDecorator(withScreenshot())
  .addDecorator((story, context) => (
    <Box background="brand">{story(context)}</Box>
  ))
  .add("default", () => (
    <SearchButton searchOpen={false} onClick={action("clicked")} />
  ));

storiesOf("Menu/LogOutButton", module)
  .addDecorator(withScreenshot())
  .add("default", () => <LogOutButton onClick={action("clicked")} />);
