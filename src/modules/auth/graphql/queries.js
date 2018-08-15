// @flow

import gql from "graphql-tag";

export const Auth = gql`
  query Auth {
    auth @client {
      authenticated
      username
      groups
    }
  }
`;
