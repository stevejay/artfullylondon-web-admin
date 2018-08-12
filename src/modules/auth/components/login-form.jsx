// @flow

import type { FormikProps } from "formik";
import type { LoginFormValues } from "../flow-types";

import * as React from "react";
import { pure } from "recompose";
import { Field } from "formik";
import { Box } from "grommet";
import AnimationBox from "shared/animation-box";
import TextField from "shared/form/text-field";
import ExtendedHeading from "shared/extended-heading";
import SubmitButton from "shared/form/submit-button";

const SUBMIT_BOX_MARGIN = { top: "medium" };

const LoginForm = ({
  isSubmitting,
  handleSubmit
}: FormikProps<LoginFormValues>) => (
  <Box align="center" justify="start" flex fill>
    <AnimationBox
      animation="zoomIn"
      tag="form"
      data-test="login"
      responsive
      width="medium"
      pad="medium"
      align="stretch"
      onSubmit={handleSubmit}
      aria-label="Login Form"
    >
      <ExtendedHeading
        level={1}
        color="brand"
        size="medium"
        textAlign="center"
        responsive={false}
      >
        Artfully Admin
      </ExtendedHeading>
      <Field
        component={TextField}
        name="username"
        label="Username"
        autoFocus
        maxLength={50}
        required
      />
      <Field
        component={TextField}
        name="password"
        label="Password"
        type="password"
        maxLength={50}
        required
      />
      <Box margin={SUBMIT_BOX_MARGIN}>
        <SubmitButton isSubmitting={isSubmitting} label="Log In" fill />
      </Box>
    </AnimationBox>
  </Box>
);

export default pure(LoginForm);
