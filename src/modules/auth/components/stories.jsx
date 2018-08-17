// @flow

import * as React from "react";
import { FORM_ERROR } from "final-form";
import { storiesOf } from "@storybook/react";
import { withScreenshot } from "storybook-chrome-screenshot";
import { allWidths } from "testing/screenshot-options";
import wrapFormForStorybook from "testing/wrap-form-for-storybook";
import LoginForm from "./login-form";
import { INITIAL_VALUES } from "./login-form-handler";

storiesOf("Auth/LoginForm", module)
  .addDecorator(withScreenshot(allWidths))
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
      submitting: true
    })
  )
  .add(
    "form error",
    wrapFormForStorybook(LoginForm, {
      initialValues: INITIAL_VALUES,
      submitErrors: {
        FORM_ERROR:
          "This is an error message for the whole form that can be used to alert the user"
      }
    })
  );
