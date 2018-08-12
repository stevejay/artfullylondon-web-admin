// @flow

import type { EventTalent } from "../flow-types";

import * as React from "react";
import empty from "empty";
import isEmpty from "lodash/isEmpty";
import { Box, Heading } from "grommet";
import EntityImage from "shared/entity-image";
import ExtendedText from "shared/extended-text";
import ExtendedRoutedAnchor from "shared/scroll/extended-routed-anchor";
import * as entityType from "shared/types/entity-type";
import { createEntityThumbnailImageUrl, asCssColor } from "shared/utils/image";
import { tryGetMainImage, getTalentDisplayName } from "../utils/entity";

type Props = {
  +talent: EventTalent
};

const TalentCard = ({ talent }: Props) => {
  const mainImage = tryGetMainImage(talent.talent.images);
  return (
    <Box pad="small" basis="1/2" flex={false} responsive>
      <Box
        tag="article"
        direction="row"
        responsive
        // margin={{ bottom: "small" }}
        border={{ color: "neutral-2", side: "all", size: "xsmall" }}
      >
        <Box responsive style={{ width: 80, height: 80 }} margin="xsmall">
          <EntityImage
            a11yTitle="Talent image"
            entityType={entityType.TALENT}
            imageSrc={
              mainImage ? createEntityThumbnailImageUrl(mainImage.id) : null
            }
            backgroundColor={
              mainImage ? asCssColor(mainImage.dominantColor) : null
            }
            lazyLoad={false}
          />
        </Box>
        <Box
          responsive
          flex
          margin={{ vertical: "xsmall", left: "none", right: "xsmall" }}
        >
          {!isEmpty(talent.roles) && (
            <ExtendedText color="dark-3" size="small" textTransform="uppercase">
              {(talent.roles || empty.array).join(" / ")}
            </ExtendedText>
          )}
          <Heading
            level={3}
            size="small"
            margin={{ top: "none", bottom: "xsmall" }}
          >
            <ExtendedRoutedAnchor path={"/" + talent.id}>
              {getTalentDisplayName(
                talent.talent.firstNames,
                talent.talent.lastName
              )}
            </ExtendedRoutedAnchor>
          </Heading>
          {!isEmpty(talent.characters) && (
            <ExtendedText fontStyle="italic">
              {(talent.characters || empty.array).join(" / ")}
            </ExtendedText>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TalentCard;
