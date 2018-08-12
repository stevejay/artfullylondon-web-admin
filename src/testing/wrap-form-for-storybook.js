// @flow

import * as React from "react";
import _ from "lodash";
import { Formik } from "formik";
import { action } from "@storybook/addon-actions";

type FormWrapper = (
  React.ElementType,
  {
    +initialValues: { [key: string]: any },
    +isSubmitting?: boolean
  }
) => () => any;

const wrapFormForStorybook: FormWrapper = (FormComponent, formProps) => () => {
  const { initialValues, isSubmitting, ...rest } = formProps;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={_.noop}
      render={props => (
        <FormComponent
          {...props}
          {...rest}
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
