// @flow

import type { FormRenderProps } from "react-final-form";

import * as React from "react";
import { Field } from "react-final-form";
import { Box } from "grommet";
import AnimationBox from "shared/animation-box";
import TextField from "shared/form/text-field";
import ExtendedHeading from "shared/extended-heading";
import SubmitButton from "shared/form/submit-button";
import FormError from "shared/form/error";

const SUBMIT_BOX_MARGIN = { top: "medium" };

const LoginForm = ({
  handleSubmit,
  submitting,
  submitErrors
}: FormRenderProps) => (
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
      <FormError errors={submitErrors} name="FORM_ERROR" />
      <Box margin={SUBMIT_BOX_MARGIN}>
        <SubmitButton isSubmitting={!!submitting} label="Log In" fill />
      </Box>
    </AnimationBox>
  </Box>
);

export default LoginForm;
