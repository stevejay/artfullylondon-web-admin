// @flow

import * as React from "react";
import { Box } from "grommet";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withScreenshot } from "storybook-chrome-screenshot";
import centered from "testing/centered";
import * as entityType from "../types/entity-type";
import Error from "./error";
import Select from "./select";
import SubmitButton from "./submit-button";
import ExtendedTextInput from "./extended-text-input";
import TextField from "./text-field";

const ENTITY_TYPE_OPTIONS = [
  { id: entityType.ALL, label: "in all" },
  { id: entityType.EVENT, label: "in events" },
  { id: entityType.EVENT_SERIES, label: "in event series" },
  { id: entityType.VENUE, label: "in venues" },
  { id: entityType.TALENT, label: "in talents" }
];

storiesOf("Form/Error", module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("no error", () => (
    <Error errors={{ username: "Some short message" }} name="password" />
  ))
  .add("short message", () => (
    <Error errors={{ username: "Some short message" }} name="username" />
  ))
  .add("long message", () => (
    <Error
      errors={{
        username:
          "Some long message that extends over multiple lines even on a wide screen and so it demonstrates line height as part of this Storybook test"
      }}
      name="username"
    />
  ));

storiesOf("Form/Select", module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("default", () => (
    <Select
      a11yTitle="The a11y title"
      field={{
        name: "entityType",
        value: ENTITY_TYPE_OPTIONS[4],
        onBlur: action("blurred")
      }}
      setFieldValue={action("field value set")}
      options={ENTITY_TYPE_OPTIONS}
    />
  ));

storiesOf("Form/SubmitButton", module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("default", () => (
    <SubmitButton isSubmitting={false} label="Submit the form" fill />
  ))
  .add("submitting", () => (
    <SubmitButton isSubmitting label="Submit the form" fill />
  ));

storiesOf("Form/ExtendedTextInput", module)
  .addDecorator(centered)
  .add("default", () => (
    <ExtendedTextInput
      field={{
        name: "username",
        value: "Steve",
        onChange: action("changed"),
        onBlur: action("blurred")
      }}
    />
  ))
  .add("background", () => (
    <ExtendedTextInput
      inputBackground="neutral-4"
      field={{
        name: "username",
        value: "Steve",
        onChange: action("changed"),
        onBlur: action("blurred")
      }}
    />
  ));

storiesOf("Form/TextField", module)
  .addDecorator(withScreenshot())
  .addDecorator(centered)
  .add("default", () => (
    <TextField
      label="The Label"
      fastFieldFix={false}
      field={{
        name: "username",
        value: "steve",
        onChange: action("changed"),
        onBlur: action("blurred")
      }}
      form={{
        touched: {
          username: false
        },
        errors: {
          username: null
        }
      }}
    />
  ))
  .add("error", () => (
    <TextField
      label="The Label"
      fastFieldFix={false}
      field={{
        name: "username",
        value: "steve",
        onChange: action("changed"),
        onBlur: action("blurred")
      }}
      form={{
        touched: {
          username: true
        },
        errors: {
          username: "Some error"
        }
      }}
    />
  ));
