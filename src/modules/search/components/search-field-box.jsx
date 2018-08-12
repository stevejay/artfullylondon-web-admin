// @flow

import * as React from "react";
import { Box } from "grommet";

const BOX_BORDER = { side: "bottom", color: "dark-3", size: "xsmall" };
const BOX_MARGIN = { horizontal: "small" };

type Props = {
  +children: React.Node
};

const SearchFieldBox = ({ children }: Props) => (
  <Box border={BOX_BORDER} margin={BOX_MARGIN}>
    {children}
  </Box>
);

export default SearchFieldBox;
