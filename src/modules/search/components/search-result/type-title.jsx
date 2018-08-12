// @flow

import * as React from "react";
import { Box } from "grommet";
import { getEntityTypeDisplayName } from "shared/utils/entity";
import ExtendedText from "shared/extended-text";

const BOX_PAD = { horizontal: "small", vertical: "xsmall" };

type Props = {
  +entityType: string
};

const SearchResultTypeTitle = ({ entityType }: Props) => (
  <Box pad={BOX_PAD} background="brand" flex={false}>
    <ExtendedText
      tag="div"
      size="medium"
      weight="bold"
      color="light-1"
      textTransform="uppercase"
    >
      {getEntityTypeDisplayName(entityType)}
    </ExtendedText>
  </Box>
);

export default SearchResultTypeTitle;
