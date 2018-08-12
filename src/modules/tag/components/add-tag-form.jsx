// @flow

import type { FormikProps } from "formik";
import type { AddTagFormValues } from "../flow-types";

import * as React from "react";
import { Field } from "formik";
import { Box } from "grommet";
import TextInput from "shared/form/extended-text-input";
import FormError from "shared/form/error";
import SubmitButton from "shared/form/submit-button";
import AnimationBox from "shared/animation-box";

const AddTagForm = (props: FormikProps<AddTagFormValues>) => (
  <AnimationBox
    animation="zoomIn"
    tag="form"
    id="add-tag"
    responsive
    direction="column"
    onSubmit={props.handleSubmit}
    data-test="add tag form"
  >
    <Box responsive direction="row" align="center" gap="small" flex="grow">
      <Field
        component={TextInput}
        name="label"
        placeholder="New label"
        size="medium"
        required
        autoFocus
        inputBackground="light-1"
      />
      <Box flex="grow">
        <SubmitButton isSubmitting={props.isSubmitting} label="Add" />
      </Box>
    </Box>
    <FormError errors={props.errors} name="label" />
  </AnimationBox>
);

export default AddTagForm;
