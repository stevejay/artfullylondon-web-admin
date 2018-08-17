// @flow

import * as React from "react";
import _ from "lodash";
import { Form } from "react-final-form";
import { action } from "@storybook/addon-actions";

type FormWrapper = (
  React.ElementType,
  {
    +initialValues: { [key: string]: any },
    +submitting?: boolean,
    +submitError?: any
  }
) => () => any;

const wrapFormForStorybook: FormWrapper = (FormComponent, formProps) => () => {
  const { submitError, initialValues, submitting, ...rest } = formProps;
  return (
    <Form
      initialValues={initialValues}
      onSubmit={_.noop}
      render={props => (
        <FormComponent
          {...props}
          {...rest}
          submitError={submitError || props.submitError}
          handleSubmit={(event: SyntheticEvent<HTMLButtonElement>) => {
            action("submitted")(event);
            event.stopPropagation();
            event.preventDefault();
          }}
          submitting={!!submitting}
        />
      )}
    />
  );
};

export default wrapFormForStorybook;
