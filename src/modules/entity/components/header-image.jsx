// @flow

import type { ImageArray } from "../flow-types";

import * as React from "react";
import { Box, Text, Stack } from "grommet";
import EntityImage from "shared/entity-image";
import { createEntityImageUrl, asCssColor } from "shared/utils/image";
import { tryGetMainImage } from "../utils/entity";

const ENTITY_IMAGE_SIZE = { width: 300, height: 300 };
const COPYRIGHT_BOX_BACKGROUND = { color: "dark-1", opacity: "medium" };
const COPYRIGHT_BOX_PAD = { horizontal: "xsmall", vertical: "none" };

type Props = {
  +entityType: string,
  +images: ?ImageArray
};

const HeaderImage = ({ images, entityType }: Props) => {
  const mainImage = tryGetMainImage(images);
  return mainImage ? (
    <Box
      responsive
      background={asCssColor(mainImage.dominantColor)}
      align="center"
      justify="center"
      direction="column"
    >
      <Stack anchor="bottom-left">
        <Box style={ENTITY_IMAGE_SIZE}>
          <EntityImage
            a11yTitle="Venue image"
            entityType={entityType}
            imageSrc={createEntityImageUrl(mainImage.id)}
            backgroundColor={asCssColor(mainImage.dominantColor)}
            lazyLoad={false}
          />
        </Box>
        {mainImage.copyright && (
          <Box
            margin="xsmall"
            background={COPYRIGHT_BOX_BACKGROUND}
            pad={COPYRIGHT_BOX_PAD}
          >
            <Text size="xsmall" color="light-3">
              &copy; {mainImage.copyright}
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  ) : null;
};

export default HeaderImage;
