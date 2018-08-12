// @flow

import type { AutocompleteNode } from "../../flow-types";

import * as React from "react";
import { Box } from "grommet";
import AutocompleteResult from "./autocomplete-result";

type Props = {
  +autocompleteItems: ?Array<AutocompleteNode>,
  +autocompleteIndex: number,
  +onClick: void => void
};

const AutocompleteResultList = ({
  autocompleteItems,
  autocompleteIndex,
  onClick
}: Props) => (
  <Box
    tag="ul"
    margin="medium"
    overflow="scroll"
    a11yTitle="Autocomplete search results"
    data-test="autocomplete list"
  >
    {autocompleteItems &&
      autocompleteItems.map((item, index) => (
        <AutocompleteResult
          key={item.id}
          {...item}
          selected={autocompleteIndex === index}
          onClick={onClick}
        />
      ))}
  </Box>
);

export default AutocompleteResultList;
