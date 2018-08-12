// @flow

import gql from "graphql-tag";

export const UpdateSearchParams = gql`
  mutation UpdateSearchParams($term: String!, $entityType: String!) {
    updateSearchParams(term: $term, entityType: $entityType) @client
  }
`;
