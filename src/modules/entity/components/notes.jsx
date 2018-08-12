// @flow

import * as React from "react";
import { Box, Text } from "grommet";
import SectionHeading from "./section-heading";

const BOX_MARGIN = { horizontal: "medium", top: "none", bottom: "medium" };

type Props = {
  +notes: ?string
};

const Notes = ({ notes }: Props) =>
  notes ? (
    <React.Fragment>
      <SectionHeading title="Notes" />
      <Box margin={BOX_MARGIN} responsive>
        <Text tag="p" margin="none">
          {notes}
        </Text>
      </Box>
    </React.Fragment>
  ) : null;

export default Notes;
