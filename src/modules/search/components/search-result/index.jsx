// @flow

import type { SearchNode } from "../../flow-types";

import * as React from "react";
import { shouldUpdate } from "recompose";
import styled from "styled-components";
import { Box, Heading, Text } from "grommet";
import ExtendedRoutedAnchor from "shared/scroll/extended-routed-anchor";
import EntityImage from "shared/entity-image";
import ExtendedText from "shared/extended-text";
import { createEntityImageUrl, asCssColor } from "shared/utils/image";
import Card from "./card";
import TypeTitle from "./type-title";

// TODO see if grommet v2 final version allows me to use Stack
// for the card title box.

const InfoBox = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const INFO_BOX_BACKGROUND = { color: "dark-1", opacity: "strong" };
const VENUE_BOX_MARGIN = { top: "xsmall" };

const SearchResult = ({
  id,
  entityType,
  name,
  image,
  imageColor,
  venueName
}: SearchNode) => (
  <Card>
    <TypeTitle entityType={entityType} />
    <EntityImage
      a11yTitle="Entity image"
      entityType={entityType}
      imageSrc={createEntityImageUrl(image)}
      backgroundColor={asCssColor(imageColor)}
      lazyLoad
    />
    <InfoBox tag="header" pad="small" background={INFO_BOX_BACKGROUND}>
      <Heading margin="none" level={2}>
        <Text tag="div" size="medium" weight="bold" color="light-1">
          <ExtendedRoutedAnchor path={"/" + id} color="light-1">
            {name}
          </ExtendedRoutedAnchor>
        </Text>
      </Heading>
      {venueName && (
        <Box margin={VENUE_BOX_MARGIN}>
          <ExtendedText
            tag="div"
            size="small"
            weight="bold"
            color="light-5"
            textTransform="uppercase"
          >
            {venueName}
          </ExtendedText>
        </Box>
      )}
    </InfoBox>
  </Card>
);

export default shouldUpdate(() => false)(SearchResult);
