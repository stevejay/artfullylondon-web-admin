// @flow

import * as React from "react";
import { pure } from "recompose";
import { Box } from "grommet";
import { getEntityTypeIcon } from "shared/utils/entity";

const ICON_STYLE = { width: "80%", height: "80%" };

type Props = {
  +entityType: string
};

const Placeholder = ({ entityType }: Props) => {
  const EntityIcon = getEntityTypeIcon(entityType);
  return (
    <Box flex align="center" justify="center">
      <EntityIcon color="light-5" style={ICON_STYLE} />
    </Box>
  );
};

export default pure(Placeholder);
