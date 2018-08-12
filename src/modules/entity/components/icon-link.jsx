// @flow

import type { Link } from "../flow-types";

import * as React from "react";
import { Box, Anchor } from "grommet";
import { getLinkTypeIconForDisplay } from "../utils/link";

type Props = {
  +link: Link
};

const IconLink = ({ link }: Props) => {
  const Icon = getLinkTypeIconForDisplay(link.type);
  return (
    <Anchor
      key={link.type}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box background="light-2" pad="small" responsive round="xlarge">
        <Icon color="dark-5" size="small" role="presentation" aria-hidden />
      </Box>
    </Anchor>
  );
};

export default IconLink;
