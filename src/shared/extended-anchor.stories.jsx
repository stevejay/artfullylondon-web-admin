// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import centered from "testing/centered";
import ExtendedAnchor from "./extended-anchor";

storiesOf("ExtendedAnchor", module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("default", () => (
    <ExtendedAnchor
      color="brand"
      label="The label"
      href="https://duckduckgo.com"
      target="_blank"
      rel="noopener noreferrer"
    />
  ))
  .add("plain", () => (
    <ExtendedAnchor
      color="brand"
      label="The label"
      href="https://duckduckgo.com"
      target="_blank"
      rel="noopener noreferrer"
      plain
    />
  ));
