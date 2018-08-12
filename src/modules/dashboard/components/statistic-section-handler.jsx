// @flow

import type { QueryRenderProps } from "react-apollo";
import type { EntityCountResult } from "../flow-types";

import * as React from "react";
import { Query } from "react-apollo";
import ErrorContentState from "shared/content-state/error";
import LoadingContentState from "shared/content-state/loading";
import { EntityCountQuery } from "../graphql/queries";
import StatisticSection from "./statistic-section";

const StatisticSectionHandler = () => (
  <Query query={EntityCountQuery} pollInterval={180000}>
    {({ loading, error, data }: QueryRenderProps<EntityCountResult>) => {
      if (error) {
        return <ErrorContentState />;
      } else if (loading || !data || !data.entityCount) {
        return <LoadingContentState />;
      } else {
        return <StatisticSection statisticList={data.entityCount.results} />;
      }
    }}
  </Query>
);

export default StatisticSectionHandler;
