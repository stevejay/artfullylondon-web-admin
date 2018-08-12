// @flow

import * as React from "react";
import { Box } from "grommet";
import { storiesOf } from "@storybook/react";
import { User as Talent } from "grommet-icons";
import { withScreenshot } from "storybook-chrome-screenshot";
import HeroBox from ".";

storiesOf("HeroBox", module)
  .addDecorator(withScreenshot())
  .addDecorator(story => <Box width="full">{story()}</Box>)
  .add("basic", () => (
    <HeroBox
      tag="section"
      responsive
      pad="medium"
      height="medium"
      flex="grow"
      background="light-2"
    >
      The Hero Content
    </HeroBox>
  ))
  .add("basic with left-aligned icon", () => (
    <HeroBox
      tag="section"
      responsive
      pad="medium"
      height="medium"
      flex="grow"
      background="light-2"
      withIcon
    >
      <HeroBox.Icon
        icon={Talent}
        size="xxxlarge"
        color="light-3"
        alignment="left"
      />
      The Hero Content
    </HeroBox>
  ))
  .add("patterned", () => (
    <HeroBox
      tag="section"
      responsive
      pad="medium"
      height="medium"
      flex="grow"
      background="light-2"
      pattern="wave"
    >
      The Hero Content
    </HeroBox>
  ))
  .add("patterned with right-aligned icon", () => (
    <HeroBox
      tag="section"
      responsive
      pad="medium"
      height="medium"
      flex="grow"
      background="light-2"
      pattern="wave"
      withIcon
    >
      <HeroBox.Icon
        icon={Talent}
        size="xxxlarge"
        color="light-3"
        alignment="right"
      />
      The Hero Content
    </HeroBox>
  ));
