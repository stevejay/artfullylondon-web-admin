// @flow

import * as React from "react";
import { withScreenshot } from "storybook-chrome-screenshot";
import { storiesOf } from "@storybook/react";
import DefinitionList from ".";
import { allWidths } from "testing/screenshot-options";

storiesOf("DefinitionList", module)
  .addDecorator(withScreenshot(allWidths))
  .add("default", () => (
    <DefinitionList>
      <DefinitionList.Definition
        term="The Title"
        description="The description"
      />
      <DefinitionList.Definition
        term="Another Title"
        description="Another description"
      />
    </DefinitionList>
  ));
