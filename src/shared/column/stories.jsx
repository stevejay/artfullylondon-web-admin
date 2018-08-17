// @flow

import * as React from "react";
import { withScreenshot } from "storybook-chrome-screenshot";
import { storiesOf } from "@storybook/react";
import { Box } from "grommet";
import Column from ".";
import { allWidths } from "testing/screenshot-options";

storiesOf("Column", module)
  .addDecorator(withScreenshot(allWidths))
  .addDecorator((story, context) => <Box width="full">{story(context)}</Box>)
  .add("two columns", () => (
    <Column.Container>
      <Column basis="2/3">
        <Box width="full" height="medium" background="#ffefd5" />
      </Column>
      <Column basis="1/3">
        <Box width="full" height="medium" background="#d5e5ff" />
      </Column>
    </Column.Container>
  ));
