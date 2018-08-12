import * as React from "react";
import _ from "lodash";
import { Box } from "grommet";
import "sanitize.css";
import "@storybook/addon-console";
import { checkA11y } from "@storybook/addon-a11y";
import { Grommet } from "grommet";
import { configure, addDecorator } from "@storybook/react";
import {
  initScreenshot,
  setScreenshotOptions
} from "storybook-chrome-screenshot";
import StoryRouter from "storybook-react-router";
import theme from "../src/theme";
import { wide } from "testing/screenshot-options";

addDecorator(initScreenshot());
setScreenshotOptions(wide);
addDecorator(StoryRouter());
addDecorator(checkA11y);

addDecorator(story => (
  <Grommet full theme={theme}>
    <Box width="full" direction="column" background="#FAFAFA">
      {story()}
    </Box>
  </Grommet>
));

const req = require.context("../src", true, /stories\.jsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
