// @flow

import type { EntityCount } from "../flow-types";

import * as React from "react";
import empty from "empty";
import { Box } from "grommet";
import { pure } from "recompose";
import EntityStatistic from "./entity-statistic";

type Props = {
  +statisticList?: Array<EntityCount>
};

const StatisticSection = ({ statisticList }: Props) => (
  <Box tag="section" wrap flex direction="row-responsive" pad="small">
    {(statisticList || empty.array).map(statistic => (
      <EntityStatistic
        key={statistic.entityType}
        entityType={statistic.entityType}
        count={statistic.count}
      />
    ))}
  </Box>
);

export default pure(StatisticSection);
