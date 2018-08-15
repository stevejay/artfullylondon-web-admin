// @flow

import type { QueryRenderProps } from "react-apollo";
import type { AuthState } from "../flow-types";

import * as React from "react";
import { Query } from "react-apollo";
import ErrorContentState from "shared/content-state/error";
import LoadingContentState from "shared/content-state/loading";
import UserSummarySection from "./user-summary-section";
import { Auth } from "../graphql/queries";

const UserSummarySectionHandler = () => (
  <Query query={Auth}>
    {({ loading, error, data }: QueryRenderProps<AuthState>) => {
      if (error) {
        return <ErrorContentState />;
      } else if (loading || !data || !data.auth) {
        return <LoadingContentState />;
      } else {
        return <UserSummarySection {...data.auth} />;
      }
    }}
  </Query>
);

export default UserSummarySectionHandler;
