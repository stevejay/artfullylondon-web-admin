// @flow

import type { HOC } from "recompose";
import type { MutationOperation } from "apollo-client";
import type { QueryRenderProps } from "react-apollo";
import type { AuthState } from "../flow-types";

import * as React from "react";
import empty from "empty";
import log from "loglevel";
import { withStateHandlers, pure, compose } from "recompose";
import { Query, graphql } from "react-apollo";
import LoginFormHandler from "./login-form-handler";
import { AttemptAutoLogin } from "../graphql/mutations";
import { Auth } from "../graphql/queries";

type Props = {
  +children: React.Node
};

type EnhancedProps = {
  ...Props,
  +mutate: MutationOperation<>,
  autoLoginAttempted: boolean,
  setAutoLoginAttempted: () => Promise<null>
};

export class AuthHandler extends React.Component<EnhancedProps> {
  componentDidMount() {
    this.props
      .mutate(empty.object)
      .catch(log.error)
      .then(this.props.setAutoLoginAttempted)
      .catch(log.error);
  }
  render() {
    return (
      <Query query={Auth}>
        {({ data }: QueryRenderProps<AuthState>) => {
          if (!this.props.autoLoginAttempted) {
            return null;
          } else if (!data || !data.auth || !data.auth.authenticated) {
            return <LoginFormHandler />;
          } else {
            return this.props.children;
          }
        }}
      </Query>
    );
  }
}

const enhancer: HOC<*, Props> = compose(
  withStateHandlers(
    { autoLoginAttempted: false },
    { setAutoLoginAttempted: () => () => ({ autoLoginAttempted: true }) }
  ),
  graphql(AttemptAutoLogin),
  pure
);

export default enhancer(AuthHandler);
