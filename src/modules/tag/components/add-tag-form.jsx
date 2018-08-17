// @flow

import type { FormRenderProps } from "react-final-form";

import * as React from "react";
import { Field } from "react-final-form";
import { Box } from "grommet";
import ExtendedTextInput from "shared/form/extended-text-input";
import FormError from "shared/form/error";
import SubmitButton from "shared/form/submit-button";
import AnimationBox from "shared/animation-box";

// TODO how to clear the form error when the user changes the label text?

const AddTagForm = ({
  handleSubmit,
  submitting,
  submitErrors
}: FormRenderProps) => (
  <AnimationBox
    animation="zoomIn"
    tag="form"
    id="add-tag"
    responsive
    direction="column"
    onSubmit={handleSubmit}
    data-test="add tag form"
  >
    <Box responsive direction="row" align="center" gap="small" flex="grow">
      <Field
        component={ExtendedTextInput}
        name="label"
        placeholder="New label"
        size="medium"
        required
        autoFocus
        inputBackground="light-1"
      />
      <Box flex="grow">
        <SubmitButton isSubmitting={!!submitting} label="Add" />
      </Box>
    </Box>
    <FormError errors={submitErrors} name="FORM_ERROR" />
  </AnimationBox>
);

export default AddTagForm;
