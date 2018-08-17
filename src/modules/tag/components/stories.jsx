// @flow

import * as React from "react";
import _ from "lodash";
import { Box } from "grommet";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withScreenshot } from "storybook-chrome-screenshot";
import { withApolloProvider } from "storybook-addon-apollo-graphql";
import wrapFormForStorybook from "testing/wrap-form-for-storybook";
import { allWidths } from "testing/screenshot-options";
import centered from "testing/centered";
import AddTagForm from "./add-tag-form";
import Tag from "./tag";
import TagList from "./tag-list";
import { INITIAL_VALUES } from "./add-tag-form-handler";

storiesOf("Tag/AddTagForm", module)
  .addDecorator(withScreenshot(allWidths))
  .add(
    "default",
    wrapFormForStorybook(AddTagForm, {
      initialValues: INITIAL_VALUES,
      submitting: false
    })
  )
  .add(
    "submitting",
    wrapFormForStorybook(AddTagForm, {
      initialValues: INITIAL_VALUES,
      submitting: true
    })
  )
  .add(
    "error",
    wrapFormForStorybook(AddTagForm, {
      submitErrors: { FORM_ERROR: "Some error message" },
      initialValues: INITIAL_VALUES,
      submitting: false
    })
  );

storiesOf("Tag/Tag", module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("default", () => (
    <Tag tagType="MEDIUM" label="some tag" onClick={action("onClick")} />
  ))
  .add("deleting", () => (
    <Tag tagType="MEDIUM" label="some tag" onClick={null} />
  ));

storiesOf("Tag/TagList", module)
  .addDecorator(withScreenshot())
  .addDecorator(
    withApolloProvider({
      typeDefs: "type Query { random: Int! }",
      mocks: { Query: () => ({}) },
      schemaOptions: {},
      mockOptions: {}
    })
  )
  .addDecorator((story, context) => (
    <Box pad="medium" width="full">
      {story(context)}
    </Box>
  ))
  .add("many tags", () => (
    <TagList
      tags={_.range(1, 50).map(index => ({
        tagType: "MEDIUM",
        id: `medium/${index}`,
        label: index.toString()
      }))}
    />
  ))
  .add("few tags", () => (
    <TagList
      tags={_.range(1, 4).map(index => ({
        tagType: "MEDIUM",
        id: `medium/${index}`,
        label: index.toString()
      }))}
    />
  ));
