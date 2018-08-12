// @flow

import type { EntityCount } from "../flow-types";

import * as React from "react";
import { Box, Text } from "grommet";
import HeroBox from "shared/hero-box";
import ExtendedHeading from "shared/extended-heading";
import {
  getEntityTypeDisplayName,
  getEntityTypeIcon
} from "shared/utils/entity";

const BOX_BORDER = { color: "neutral-2", side: "all", size: "xsmall" };
type Props = EntityCount;

const StatisticCard = ({ entityType, count }: Props) => {
  const displayType = getEntityTypeDisplayName(entityType);
  return (
    <Box pad="small" basis="1/2" flex={false} responsive>
      <HeroBox
        animation="fadeIn"
        tag="section"
        a11yTitle={`Count of ${displayType} type in the system`}
        responsive
        pad="medium"
        flex="grow"
        background="light-2"
        overflow="hidden"
        justify="between"
        border={BOX_BORDER}
        data-test={`${entityType} statistic`}
      >
        <HeroBox.Icon
          icon={getEntityTypeIcon(entityType)}
          size="xxlarge"
          color="light-3"
          alignment="left"
        />
        <ExtendedHeading
          level={2}
          size="medium"
          color="dark-4"
          responsive
          margin="none"
          textTransform="uppercase"
        >
          {displayType}
        </ExtendedHeading>
        <Text
          tag="p"
          color="neutral-2"
          size="xxlarge"
          margin="none"
          textAlign="end"
          data-test="entity count"
        >
          {count}
        </Text>
      </HeroBox>
    </Box>
  );
};

export default StatisticCard;
