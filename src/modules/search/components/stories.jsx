// @flow

import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import * as entityType from "shared/types/entity-type";
import wrapFormForStorybook from "testing/wrap-form-for-storybook";
import { allWidths } from "testing/screenshot-options";
import BasicSearchForm from "./basic-search-form";

const INITIAL_VALUES = {
  term: "Foo",
  entityType: { id: entityType.EVENT, label: "in events" }
};

// TODO add stories for SearchResultList

storiesOf("Search/BasicSearchForm", module)
  .addDecorator(withScreenshot(allWidths))
  .add(
    "not submitting",
    wrapFormForStorybook(BasicSearchForm, {
      initialValues: INITIAL_VALUES,
      submitting: false
    })
  );
