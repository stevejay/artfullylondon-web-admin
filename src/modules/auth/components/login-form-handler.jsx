// @flow

import type { MutationOperation } from "apollo-client";
import type { FormikActions } from "formik";
import type { LoginFormValues } from "../flow-types";

import * as React from "react";
import log from "loglevel";
import { graphql } from "react-apollo";
import { Formik } from "formik";
import { LogIn } from "../graphql/mutations";
import { translateAuthErrorMessage } from "../auth-utils";
import LoginForm from "./login-form";

export const INITIAL_VALUES = { username: "", password: "" };

type Props = {
  +mutate: MutationOperation<>
};

export class LoginFormHandler extends React.Component<Props> {
  handleSubmit = (
    values: LoginFormValues,
    { setErrors, setSubmitting }: FormikActions<LoginFormValues>
  ) => {
    this.props
      .mutate({ variables: values })
      .catch(err => {
        setErrors({ username: translateAuthErrorMessage(err) });
        setSubmitting(false);
      })
      .catch(log.error);
  };
  render() {
    return (
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={this.handleSubmit}
        component={LoginForm}
      />
    );
  }
}

export default graphql(LogIn)(LoginFormHandler);
