// @flow

import * as React from "react";
import { Box } from "grommet";
import ExtendedText from "shared/extended-text";

const BOX_BORDER = { color: "brand", side: "bottom", size: "xsmall" };
const BOX_PAD = { horizontal: "medium", vertical: "xsmall" };
const BOX_MARGIN = { horizontal: "none", top: "none", bottom: "medium" };

type Props = {
  +title: string
};

const SectionHeading = ({ title }: Props) => (
  <Box margin={BOX_MARGIN} border={BOX_BORDER} responsive pad={BOX_PAD}>
    <ExtendedText
      tag="h2"
      weight="normal"
      color="dark-1"
      size="medium"
      responsive
      margin="none"
      textTransform="uppercase"
    >
      {title}
    </ExtendedText>
  </Box>
);

export default SectionHeading;
