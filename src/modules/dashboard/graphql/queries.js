// @flow

import gql from "graphql-tag";

export const EntityCountQuery = gql`
  query EntityCount {
    entityCount {
      results {
        entityType
        count
      }
    }
  }
`;
