// @flow

import type { MutationOperation } from "apollo-client";
import type { LoginFormValues } from "../flow-types";

import * as React from "react";
import { graphql } from "react-apollo";
import { Form } from "react-final-form";
import { LogIn } from "../graphql/mutations";
import { translateAuthErrorMessage } from "../auth-utils";
import LoginForm from "./login-form";

export const INITIAL_VALUES = { username: "", password: "" };

type Props = {
  +mutate: MutationOperation<>
};

class LoginFormHandler extends React.Component<Props> {
  handleSubmit = (values: LoginFormValues) =>
    this.props
      .mutate({ variables: values })
      .catch(err => ({ FORM_ERROR: translateAuthErrorMessage(err) }));

  render() {
    return (
      <Form
        initialValues={INITIAL_VALUES}
        onSubmit={this.handleSubmit}
        component={LoginForm}
        subscription={{ submitting: true, submitErrors: true }}
      />
    );
  }
}

export default graphql(LogIn)(LoginFormHandler);
