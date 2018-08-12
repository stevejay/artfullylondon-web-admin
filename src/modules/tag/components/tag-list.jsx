// @flow

import type { TagArray } from "../flow-types";

import * as React from "react";
import { Box } from "grommet";
import TagHandler from "./tag-handler";

const BOX_BORDER = { color: "neutral-2", side: "all", size: "xsmall" };

type Props = {
  +tags: TagArray
};

const TagList = (props: Props) => (
  <Box
    tag="ul"
    direction="row"
    wrap
    alignContent="start"
    pad="small"
    round="xsmall"
    border={BOX_BORDER}
    responsive
    flex
  >
    {props.tags.map(tag => <TagHandler key={tag.id} {...tag} />)}
  </Box>
);

export default TagList;
