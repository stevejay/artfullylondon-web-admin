// @flow

import type { StoryDecorator } from "@storybook/react";

import * as React from "react";
import { Box } from "grommet";

const centered: StoryDecorator = (story, context) => (
  <Box width="full" height="full" align="center" justify="center" pad="medium">
    {story(context)}
  </Box>
);

export default centered;
