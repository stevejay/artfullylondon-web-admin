// @flow

import * as React from "react";
import { Text, Box } from "grommet";

const BOX_MARGIN = { horizontal: "medium", top: "none", bottom: "medium" };

type Props = {
  +summary: ?string
};

const Summary = ({ summary }: Props) =>
  summary ? (
    <Box tag="p" margin={BOX_MARGIN}>
      <Text size="large">{summary}</Text>
    </Box>
  ) : null;

export default Summary;
