// @flow

import * as React from "react";
import { Box } from "grommet";
import { Star } from "grommet-icons";

const ALL_STARS = [1, 2, 3, 4, 5];

type Props = {
  +rating: number
};

const Rating = ({ rating }: Props) => (
  <Box tag="span" direction="row">
    {ALL_STARS.map(
      index =>
        index <= rating ? (
          <Star key={index} color="neutral-4" size="medium" />
        ) : (
          <Star key={index} color="light-5" size="medium" />
        )
    )}
  </Box>
);

export default Rating;
