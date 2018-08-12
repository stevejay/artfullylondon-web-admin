// @flow

import * as React from "react";
import { shouldUpdate } from "recompose";
import { Dashboard } from "grommet-icons";
import PageHeader from "shared/page-header";
import ResetScroll from "shared/scroll/reset-scroll";
import StatisticSectionHandler from "./statistic-section-handler";

const DashboardPage = () => (
  <React.Fragment>
    <ResetScroll />
    <PageHeader
      icon={Dashboard}
      title="Dashboard"
      subTitle="System summary information"
    />
    <StatisticSectionHandler />
  </React.Fragment>
);

export default shouldUpdate(() => false)(DashboardPage);
