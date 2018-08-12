// @flow

import * as React from "react";
import { Box, Button } from "grommet";
import { Up } from "grommet-icons";
import { preventDefault } from "../utils/event";

const Icon = <Up color="brand" size="large" />;

const ScrollToTopButton = () => (
  <Box
    background="light-1"
    elevation="large"
    align="center"
    justify="center"
    round="large"
    flex={false}
    responsive={false}
  >
    <Button icon={Icon} onClick={preventDefault} color="brand" />
  </Box>
);

export default ScrollToTopButton;
