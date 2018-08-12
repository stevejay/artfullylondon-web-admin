// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import * as entityType from "shared/types/entity-type";
import { allWidths } from "testing/screenshot-options";
import EntityStatistic from "./entity-statistic";
import StatisticSection from "./statistic-section";

storiesOf("Dashboard/EntityStatistic", module)
  .addDecorator(withScreenshot())
  .add("default", () => (
    <EntityStatistic entityType={entityType.EVENT} count={1234} />
  ));

storiesOf("Dashboard/StatisticSection", module)
  .addDecorator(withScreenshot(allWidths))
  .add("default", () => (
    <StatisticSection
      statisticList={[
        { entityType: entityType.EVENT, count: 1111 },
        { entityType: entityType.EVENT_SERIES, count: 2222 },
        { entityType: entityType.TALENT, count: 3333 },
        { entityType: entityType.VENUE, count: 4444 }
      ]}
    />
  ));
