// @flow

import type { HOC } from "recompose";
import type { RouterHistory } from "react-router-dom";
import type { MutationOperation, ApolloClient } from "apollo-client";

import * as React from "react";
import empty from "empty";
import log from "loglevel";
import { compose } from "recompose";
import { graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { LogOut } from "../graphql/mutations";

type Props = {
  +client: ApolloClient<any>,
  +mutate: MutationOperation<>,
  +component: React.ElementType,
  +history: RouterHistory
};

class LogoutMenuOptionHandler extends React.Component<Props> {
  handleLogOut = () => {
    this.props
      .mutate(empty.object)
      .then(() => {
        // NOTE promise returned by resetStore seems to never resolve,
        // so I return a resolved promise to continue the promise chain:
        this.props.client.resetStore();
        return Promise.resolve();
      })
      .then(() => this.props.history.push({ pathname: "/" }))
      .catch(log.error);
  };
  render() {
    const { component: Component } = this.props;
    return <Component onClick={this.handleLogOut} />;
  }
}

const enhancer: HOC<*, Props> = compose(
  withRouter,
  withApollo,
  graphql(LogOut)
);

export default enhancer(LogoutMenuOptionHandler);
