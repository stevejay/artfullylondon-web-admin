// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import centered from "testing/centered";
import ExtendedText from "./extended-text";

storiesOf("ExtendedText", module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("default", () => <ExtendedText>Some regular text</ExtendedText>)
  .add("italic", () => (
    <ExtendedText fontStyle="italic">Some italic text</ExtendedText>
  ))
  .add("uppercase", () => (
    <ExtendedText textTransform="uppercase">Some uppercase text</ExtendedText>
  ));
