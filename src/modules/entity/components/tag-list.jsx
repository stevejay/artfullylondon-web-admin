// @flow

import type { TagArray } from "../flow-types";
import isEmpty from "lodash/isEmpty";
import { pure } from "recompose";
import _ from "lodash";

import * as React from "react";
import { Paragraph, Box } from "grommet";
import Tag from "./tag";

type Props = {
  +mediumTags?: ?TagArray,
  +styleTags?: ?TagArray,
  +audienceTags?: ?TagArray,
  +geoTags?: ?TagArray
};

const TagList = ({ mediumTags, styleTags, audienceTags, geoTags }: Props) => {
  if (
    isEmpty(mediumTags) &&
    isEmpty(styleTags) &&
    isEmpty(audienceTags) &&
    isEmpty(geoTags)
  ) {
    return <Paragraph margin="none">No tags</Paragraph>;
  } else {
    return (
      <Box direction="row" wrap alignContent="start" responsive flex>
        {_
          .concat(mediumTags, styleTags, audienceTags, geoTags)
          .filter(tag => !!tag)
          .map(tag => <Tag key={tag.id} label={tag.label} />)}
      </Box>
    );
  }
};

export default pure(TagList);
