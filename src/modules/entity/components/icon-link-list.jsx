// @flow

import type { LinkArray } from "../flow-types";

import * as React from "react";
import isEmpty from "lodash/isEmpty";
import { Box } from "grommet";
import { tryGetLinkByType } from "../utils/link";
import * as linkType from "../types/link-type";
import IconLink from "./icon-link";

const LINK_TYPES_TO_DISPLAY = [
  linkType.HOMEPAGE,
  linkType.FACEBOOK,
  linkType.TWITTER,
  linkType.INSTAGRAM
];

const BOX_MARGIN = { bottom: "medium" };

type Props = {
  +links?: ?LinkArray,
  +entityType: string
};

const IconLinkList = ({ links, entityType }: Props) => {
  const mappedLinks = LINK_TYPES_TO_DISPLAY.map(type =>
    tryGetLinkByType(links, type)
  ).filter(link => !!link);

  return isEmpty(mappedLinks) ? null : (
    <Box
      direction="row"
      gap="small"
      responsive
      margin={BOX_MARGIN}
      justify="start"
    >
      {mappedLinks.map(link => (link ? <IconLink link={link} /> : null))}
    </Box>
  );
};

export default IconLinkList;
