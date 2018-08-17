// @flow

import * as React from "react";
import { Box } from "grommet";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import { Dashboard } from "grommet-icons";
import PageHeader from "./page-header";
import { allWidths } from "testing/screenshot-options";

storiesOf("PageHeader", module)
  .addDecorator(withScreenshot(allWidths))
  .addDecorator((story, context) => <Box width="full">{story(context)}</Box>)
  .add("default", () => (
    <PageHeader icon={Dashboard} title="Some Title" subTitle="Some sub title" />
  ));
