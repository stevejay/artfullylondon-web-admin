// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "grommet";
import { withScreenshot } from "storybook-chrome-screenshot";
import { action } from "@storybook/addon-actions";
import { allWidths } from "testing/screenshot-options";
import ModalChrome from "./modal-chrome";

storiesOf("ModalChrome", module)
  .addDecorator(withScreenshot(allWidths))
  .addDecorator((story, context) => <Box width="full">{story(context)}</Box>)
  .add("default", () => (
    <ModalChrome a11yTitle="The dialog" onClose={action("closed")}>
      The modal content
    </ModalChrome>
  ));
