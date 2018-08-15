// @flow

import type { FormikErrors } from "formik";

import * as React from "react";
import _ from "lodash";
import { Formik } from "formik";
import { action } from "@storybook/addon-actions";

type FormWrapper = (
  React.ElementType,
  {
    +initialValues: { [key: string]: any },
    +isSubmitting?: boolean,
    +errors?: ?FormikErrors<any>
  }
) => () => any;

const wrapFormForStorybook: FormWrapper = (FormComponent, formProps) => () => {
  const { errors, initialValues, isSubmitting, ...rest } = formProps;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={_.noop}
      render={props => (
        <FormComponent
          {...props}
          {...rest}
          errors={errors || props.errors}
          handleSubmit={event => {
            action("submitted")(event);
            event.stopPropagation();
            event.preventDefault();
          }}
          isSubmitting={!!isSubmitting}
        />
      )}
    />
  );
};

export default wrapFormForStorybook;
