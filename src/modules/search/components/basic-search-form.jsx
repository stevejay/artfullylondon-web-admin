// @flow

import type { FormikProps } from "formik";
import type { BasicSearchFormValues } from "../flow-types";

import * as React from "react";
import { pure } from "recompose";
import { Field } from "formik";
import { Box } from "grommet";
import TextInput from "shared/form/extended-text-input";
import Select from "shared/form/select";
import SubmitButton from "shared/form/submit-button";
import AnimationBox from "shared/animation-box";
import SearchFieldBox from "./search-field-box";
import { ENTITY_TYPE_OPTIONS } from "../constants";

const FORM_BOX_MARGIN = { horizontal: "medium", top: "medium", bottom: "none" };
const FORM_BOX_PAD = { horizontal: "medium", vertical: "small" };
const FORM_BOX_BORDER = { color: "neutral-2", side: "all", size: "xsmall" };
const BUTTON_BOX_MARGIN = { vertical: "small" };

type Props = FormikProps<BasicSearchFormValues>;

const BasicSearchForm = ({
  isSubmitting,
  handleSubmit,
  setFieldValue
}: Props) => (
  <Box
    margin={FORM_BOX_MARGIN}
    pad={FORM_BOX_PAD}
    responsive
    round="xsmall"
    border={FORM_BOX_BORDER}
  >
    <AnimationBox animation="zoomIn" responsive fill="horizontal">
      <Box
        tag="form"
        id="basic-search"
        responsive
        direction="row-responsive"
        align="center"
        justify="center"
        onSubmit={handleSubmit}
        data-test="basic search"
      >
        <SearchFieldBox>
          <Field
            component={TextInput}
            name="term"
            placeholder="Search for this"
            plain
            size="large"
            focusIndicator
            required
            autoFocus
          />
        </SearchFieldBox>
        <SearchFieldBox>
          <Field
            component={Select}
            name="entityType"
            options={ENTITY_TYPE_OPTIONS}
            setFieldValue={setFieldValue}
            closeOnChange
            plain
            size="large"
            focusIndicator
            required
            a11yTitle="Entity type to search for"
          />
        </SearchFieldBox>
        <Box margin={BUTTON_BOX_MARGIN} responsive={false} flex="grow">
          <SubmitButton isSubmitting={isSubmitting} label="Go!" fill />
        </Box>
      </Box>
    </AnimationBox>
  </Box>
);

export default pure(BasicSearchForm);
