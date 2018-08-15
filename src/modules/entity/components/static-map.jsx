// @flow

import * as React from "react";
import { Box, Anchor } from "grommet";
import EntityImage from "shared/entity-image";
import { createMapboxStaticImageUrl, createGoogleMapsUrl } from "../utils/map";

const BOX_STYLE = { width: "100%", maxWidth: 500, height: 300 };
const BOX_BORDER = { color: "neutral-2", side: "all", size: "xsmall" };
const BOX_MARGIN = { top: "none", bottom: "medium" };

type Props = {
  +latitude: number,
  +longitude: number
};

const StaticMap = ({ latitude, longitude }: Props) => (
  <Box flex align="center" margin={BOX_MARGIN}>
    <Anchor
      a11yTitle="View location using Google Maps"
      href={createGoogleMapsUrl(latitude, longitude)}
      target="_blank"
      rel="noopener noreferrer"
      style={BOX_STYLE}
    >
      <Box style={BOX_STYLE} border={BOX_BORDER}>
        <EntityImage
          a11yTitle="Venue location map"
          entityType="VENUE"
          imageSrc={createMapboxStaticImageUrl(latitude, longitude)}
          backgroundColor="light-2"
          lazyLoad
          lazyLoadOffset={0}
        />
      </Box>
    </Anchor>
  </Box>
);

export default StaticMap;
