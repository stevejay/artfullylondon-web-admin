// @flow

import type { MutationOperation, ApolloClient } from "apollo-client";

import * as React from "react";
import empty from "empty";
import log from "loglevel";
import { graphql, withApollo } from "react-apollo";
import { LogOut } from "../graphql/mutations";

type Props = {
  +client: ApolloClient<any>,
  +mutate: MutationOperation<>,
  +component: React.ElementType
};

export class LogoutMenuOptionHandler extends React.Component<Props> {
  handleLogOut = () => {
    this.props
      .mutate(empty.object)
      .then(this.props.client.resetStore)
      .catch(log.error);
  };
  render() {
    const { component: Component } = this.props;
    return <Component onClick={this.handleLogOut} />;
  }
}

export default withApollo(graphql(LogOut)(LogoutMenuOptionHandler));
