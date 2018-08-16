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
  handleSubmit = async (values: LoginFormValues) => {
    try {
      await this.props.mutate({ variables: values });
    } catch (err) {
      console.log("herer>>>>", err.message);
      return {
        // TODO change this to return: { FORM_ERROR: 'blah' }
        username: translateAuthErrorMessage(err)
      };
    }
  };
  render() {
    return (
      <Form
        initialValues={INITIAL_VALUES}
        onSubmit={this.handleSubmit}
        component={LoginForm}
      />
    );
  }
}

export default graphql(LogIn)(LoginFormHandler);
