// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import wrapFormForStorybook from "testing/wrap-form-for-storybook";
import LoginForm from "./login-form";
import { INITIAL_VALUES } from "./login-form-handler";

storiesOf("Auth/LoginForm", module)
  .addDecorator(withScreenshot())
  .add(
    "default",
    wrapFormForStorybook(LoginForm, {
      initialValues: INITIAL_VALUES
    })
  )
  .add(
    "submitting",
    wrapFormForStorybook(LoginForm, {
      initialValues: INITIAL_VALUES,
      isSubmitting: true
    })
  );
