// @flow

import * as React from "react";
import { Box, Text } from "grommet";
import { pure } from "recompose";
import ExtendedText from "shared/extended-text";

const BOX_BORDER = { color: "neutral-2", side: "all", size: "xsmall" };
const BOX_MARGIN = { bottom: "medium" };
const HEADING_MARGIN = { top: "none", bottom: "xsmall" };

type Props = {|
  +term: string,
  +description: ?string
|};

const Definition = ({ term, description }: Props) => (
  <Box
    responsive
    direction="column"
    margin={BOX_MARGIN}
    pad="medium"
    border={BOX_BORDER}
  >
    <Box tag="dt" responsive margin={HEADING_MARGIN}>
      <ExtendedText
        size="medium"
        weight="bold"
        color="neutral-2"
        textTransform="uppercase"
      >
        {term}
      </ExtendedText>
    </Box>
    <Text tag="dd" size="xlarge" margin="none">
      {description}
    </Text>
  </Box>
);

export default pure(Definition);
