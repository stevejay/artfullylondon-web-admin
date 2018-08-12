// @flow

import type { AutocompleteNode } from "../../flow-types";

import * as React from "react";
import { Box, Text } from "grommet";
import ExtendedRoutedAnchor from "shared/scroll/extended-routed-anchor";
import { getEntityTypeDisplayName } from "shared/utils/entity";
import ExtendedText from "shared/extended-text";

type Props = {
  ...$Exact<AutocompleteNode>,
  +selected: boolean,
  +onClick: void => void
};

const AutocompleteResult = ({
  id,
  name,
  entityType,
  selected,
  onClick
}: Props) => (
  <Box
    tag="li"
    pad="small"
    background={selected ? "light-3" : null}
    round="small"
    flex={false}
  >
    <Text tag="span" size="large">
      <ExtendedText
        tag="span"
        color="dark-6"
        weight="bold"
        size="large"
        textTransform="lowercase"
      >
        {getEntityTypeDisplayName(entityType)}
      </ExtendedText>
      &nbsp;
      <ExtendedRoutedAnchor path={"/" + id} onClick={onClick}>
        {name}
      </ExtendedRoutedAnchor>
    </Text>
  </Box>
);

export default AutocompleteResult;
