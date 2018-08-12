// @flow

import * as React from "react";
import { Box } from "grommet";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withScreenshot } from "storybook-chrome-screenshot";
import centered from "testing/centered";
import { allWidths } from "testing/screenshot-options";
import ScrollToTopButton from "./scroll-to-top-button";
import ExtendedRoutedAnchor from "./extended-routed-anchor";

storiesOf(`Scroll/ScrollToTopButton`, module)
  .addDecorator(withScreenshot(allWidths))
  .addDecorator(centered)
  .add("default", () => <ScrollToTopButton />);

storiesOf(`Scroll/ExtendedRoutedAnchor`, module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("default", () => (
    <ExtendedRoutedAnchor path="/foo" onClick={action("clicked")}>
      The link
    </ExtendedRoutedAnchor>
  ))
  .add("plain", () => (
    <ExtendedRoutedAnchor
      path="/foo"
      plain
      color="brand"
      onClick={action("clicked")}
    >
      The link
    </ExtendedRoutedAnchor>
  ));
