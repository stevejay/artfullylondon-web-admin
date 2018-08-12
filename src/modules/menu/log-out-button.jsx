// @flow

import * as React from "react";
import { Box, Button } from "grommet";

const BOX_MARGIN = { top: "medium" };

type Props = { onClick: void => void };

const LogOutButton = ({ onClick }: Props) => (
  <Box margin={BOX_MARGIN}>
    <Button label="Log Out" onClick={onClick} data-test="logout" />
  </Box>
);

export default LogOutButton;
