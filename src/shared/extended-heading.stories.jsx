// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import centered from "testing/centered";
import ExtendedHeading from "./extended-heading";

storiesOf("ExtendedHeading", module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("default", () => <ExtendedHeading>Some text</ExtendedHeading>)
  .add("italic", () => (
    <ExtendedHeading fontStyle="italic">Some text</ExtendedHeading>
  ))
  .add("uppercase", () => (
    <ExtendedHeading textTransform="uppercase">Some text</ExtendedHeading>
  ));
